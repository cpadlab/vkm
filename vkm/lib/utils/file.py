#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

import os, shutil

class File:

    def getParentDir(path:str) -> str:
        return FileUtils.getParentDir(path=path)

    def getAbsCurrentPath(file:str=__file__) -> str:
        return FileUtils.getAbsCurrentPath(file=file)
    
    def joinPath(*args, **kwargs) -> str:
        return FileUtils.joinPath(*args, **kwargs)
    
    def fileExists(path:str) -> bool:
        return FileUtils.fileExists(path=path)

    def createFile(path:str) -> str:
        return FileUtils.createFile(path=path)

    def cpFile(origin:str, destination:str) -> bool:
        FileUtils.cpFile(origin=origin, destination=destination)

    def parent(path, depth=3) -> str:
        return FileUtils.parent(path=path, depth=depth)
    
    def listDir(path:str) -> list:
        return FileUtils.listDir(path=path)
    
    def isDir(path:str) -> bool:
        return FileUtils.isDir(path=path)
    
    def listMedia() -> dict:
        return FileUtils.listMedia()
    
    def createFolder(path:str) -> None:
        FileUtils.createFolder(path=path)

    def getFolderSize(path: str) -> int:
        return FileUtils.getFolderSize(path=path)
    
    def countFiles(path:str) -> int:
        return FileUtils.countFiles(path=path)
    
    def countFolders(path:str) -> int:
        return FileUtils.countFolders(path=path)
    
    def copyDrive(source:str, destination:str) -> list:
        return FileUtils.copyDrive(source=source, destination=destination)
    
    def checkExists(path:str) -> bool:
        return FileUtils.checkExists(path=path)

class FileUtils:

    def getParentDir(path:str) -> str:
        return os.path.dirname(path)

    def getAbsCurrentPath(file:str=__file__) -> str:
        return os.path.abspath(file)
    
    def joinPath(*args, **kwargs) -> str:
        return os.path.join(*args, **kwargs)
    
    def fileExists(path:str) -> bool:
        return os.path.isfile(path)
    
    def checkExists(path:str) -> bool:
        return os.path.exists(path)

    def parent(path:str, depth:int=3) -> str:
        for i in range(depth):path = os.path.dirname(path)
        return path
    
    def listDir(path:str) -> list:
        return os.listdir(path)
    
    def isDir(path:str) -> bool:
        return os.path.isdir(path)
    
    def listMedia(path:str='/media', _dict:dict={}):

        if os.path.exists(path) and os.path.isdir(path):
            mediaFolders = [foldername for foldername in File.listDir(path) if File.isDir(File.joinPath(path, foldername))]
        
        for folder in mediaFolders:

            folderpath = File.joinPath(path, folder)
            insideFolders = [foldername for foldername in File.listDir(folderpath) if File.isDir(File.joinPath(folderpath, foldername))]

            _dict[folder] = {
                'total': len(insideFolders),
                'folders': insideFolders
            }

        return _dict
    
    def createFolder(path:str) -> None:
        try:
            if not os.path.exists(path):os.makedirs(path)
        except:pass

    def getFolderSize(path:str) -> int:
        total_size = 0
        
        for dirpath, dirnames, filenames in os.walk(path):
            
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                total_size += os.path.getsize(filepath)
        
        return total_size
    
    def countFiles(path:str) -> int:
        num_files = 0
        for _, _, files in os.walk(path):
            num_files += len(files)
        return num_files
    
    def countFolders(path:str) -> int:
        num_folders = 0
        for _, dirs, _ in os.walk(path):
            num_folders += len(dirs)
        return num_folders
    
    def copyDrive(source:str, destination:str) -> list:
        try:
            shutil.copytree(source, destination)
            return True, f"Contents of '{source}' successfully copied to '{destination}'."
        except OSError as e:return False, e