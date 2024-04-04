#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

import sqlite3
from ..core import config
from .file import File

class Requirements:

    def __init__(self):
        self.check = False;
        
        if Requirements.checkDDBB():
            self.check = True

    def checkDDBB(path:str=config.DDBB_FILE_PATH) -> bool:
        
        if not File.checkExists(path):
            print("[Err] Database file does not exist.")
            return False
        
        try:
        
            conn = sqlite3.connect(path)
            c = conn.cursor()

            if not c.execute('''SELECT name FROM sqlite_master WHERE type='table' AND name='vkm_sesions' ''').fetchone():
                print("[Err] The table 'Sessions' does not exist in the database..")
                return False
            
            if not c.execute('''SELECT name FROM sqlite_master WHERE type='table' AND name='vkm_auth' ''').fetchone():
                print("[Err] The table 'Auth' does not exist in the database.")
                return False

            print("[Info] The database file and all required tables exist.")
            conn.close();return True

        except sqlite3.Error as e:
            print("[Err] Error when checking the database:", e)
            return False