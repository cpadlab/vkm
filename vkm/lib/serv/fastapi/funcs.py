#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.1
#   \_/|_\_\_|_|_|
# 
# VKM v6.1
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

from ..sqlite3 import SQLite3
import json, csv, base64
from ...core import config

class FAFuncs:

    def getCookie(cookie_string):
        cookies = cookie_string.split(";");cookie_dict = {}
        for cookie in cookies:
            name, value = cookie.strip().split("=")
            cookie_dict[name] = value
        return cookie_dict

    def getToken():
        sq = SQLite3();token = SQLite3.Sesion.getLastToken(self=sq)

        if token[0] is not None:rjson = {'success': True, 'token': str(token[0].decode())}
        else:rjson = {'success': False, 'error': token[1]}
        
        return json.dumps(rjson)
    
    def checkCookie(cookie:str):

        sq = SQLite3();cookie = SQLite3.Sesion.checkActiveCookie(self=sq, cookie=cookie)
        
        if cookie[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': cookie[1]}

        return json.dumps(rjson)
    
    def registerUsername(username:str, password:str):
        
        sq = SQLite3();result = SQLite3.Account.registerUsername(self=sq, username=username, password=password)
        
        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)

    def loginUsername(username:str, password:str):

        sq = SQLite3();result = SQLite3.Account.checkCredentials(self=sq, username=username, password=password)
        
        if result[0] == True:rjson = {'success': True, 'cookie': str(result[1].decode())}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def getUsername(cookie:str):
        
        sq = SQLite3();username = SQLite3.Account.getUsernameByCookie(self=sq, cookie=cookie)

        if username[0] == None:rjson = {'success': False}
        else: rjson = {'success': True, 'nickname': username[0]}

        return json.dumps(rjson)
    
    def getTotalKeys(cookie:str):
        
        sq = SQLite3();result = SQLite3.Key.count(self=sq, cookie=cookie)
        
        if result[0] == True:rjson = {'success': True, 'total': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)

    def getGroups(cookie:str):
        
        sq = SQLite3();result = SQLite3.Group.get(self=sq, cookie=cookie)
        
        if result[0] == True:rjson = {'success': True, 'list': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def addGroup(cookie:str, groupname:str, color:str="#8338ec"):
        
        sq = SQLite3();result = SQLite3.Group.add(self=sq, cookie=cookie, groupname=groupname, color=color)
        
        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def modifyGroup(cookie:str, old:str, new:str, color:str):
        
        sq = SQLite3();result = SQLite3.Group.modify(self=sq, cookie=cookie, 
            newgroupname=new, oldgroupname=old, newcolor=color
        )
        
        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def getColorGroup(cookie:str, groupname:str):

        sq = SQLite3();
        username = SQLite3.Account.getUsernameByCookie(self=sq, cookie=cookie)
        if username[0] == None:rjson = {'success': False, 'error': username[1]} 
        else: 
            username = username[0]
            sq = SQLite3();result = SQLite3.Group.getColor(self=sq, username=username, groupname=groupname)
            
            if result != False:rjson = {'success': True, 'color': result}
            else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def deleteGroup(cookie:str, groupname:str):

        sq = SQLite3();result = SQLite3.Group.delete(self=sq, cookie=cookie, groupname=groupname)
        
        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)

    def createKey(cookie:str, name:str, link:str, username:str, password:str, group:str, favorite:bool):
        
        sq = SQLite3();result = SQLite3.Key.add(self=sq, 
            cookie=cookie, key_title=name, key_password=password, key_username=username, 
            group_name=group, key_url=link, key_favorite=favorite
        )
        
        if result[0] == True:rjson = {'success': True, 'code': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)

    def getKeysGroup(cookie:str, groupname:str):
        
        sq = SQLite3();result = SQLite3.Key.getByGroup(self=sq, cookie=cookie, group_name=groupname)
        
        if result[0] == True:rjson = {'success': True, 'keys': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    
    def deleteKey(cookie:str, code:str):

        sq = SQLite3();result = SQLite3.Key.delete(self=sq, cookie=cookie, key_code=code)

        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def modifyKey(cookie:str, code:int, name:str, link:str, username:str, password:str, group:str, favorite:bool):
        
        sq = SQLite3();result = SQLite3.Key.modify(self=sq, cookie=cookie, key_code=code, key_title=name, key_url=link,
            key_favorite=favorite, key_username=username, key_password=password, group_name=group
        )

        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)

    def getKey(cookie:str, code:int):
        
        sq = SQLite3();result = SQLite3.Key.get(self=sq, cookie=cookie, code=code)

        if result[0] == True:rjson = {'success': True, 'key': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def getFavoritesKeys(cookie:str):
        
        sq = SQLite3();result = SQLite3.Key.getFavorites(self=sq, cookie=cookie)

        if result[0] == True:rjson = {'success': True, 'keys': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def searchKey(cookie:str, search:str):

        sq = SQLite3();result = SQLite3.Key.search(self=sq, cookie=cookie, search=search)

        if result[0] == True:rjson = {'success': True, 'keys': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def modifyPassword(cookie:str, password:str):

        sq = SQLite3();result = SQLite3.Account.modifyUsernamePassword(self=sq, cookie=cookie, newpassword=password)

        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def modifyUsername(cookie:str, username:str):

        sq = SQLite3();result = SQLite3.Account.modifyUsername(self=sq, cookie=cookie, newusername=username)

        if result[0] == True:rjson = {'success': True}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def getPassword(cookie:str):
        
        sq = SQLite3();result = SQLite3.Account.getPassword(self=sq, cookie=cookie)

        if result[0] == True:rjson = {'success': True, 'password': result[1]}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def deleteAccount(cookie:str):
        
        sq = SQLite3();result = SQLite3.Account.deleteUsername(self=sq, cookie=cookie)

        if result[0] == True:rjson = {'success': True,}
        else:rjson = {'success': False, 'error': result[1]} 

        return json.dumps(rjson)
    
    def exportKeys(cookie:str):

        sq = SQLite3();resultKeys = SQLite3.Key.export(self=sq, cookie=cookie)
        if resultKeys[0] != True:{'success': False, 'error': resultKeys[1]}

        try:

            decoded_data = []
            for row in resultKeys[1]:
                decoded_row = list(row)
                decoded_row[3] = base64.b64decode(row[3]).decode('utf-8')
                decoded_data.append(tuple(decoded_row))
            
            with open(config.EXPORT_FILE, mode='w', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(['code', 'name', 'url', 'password', 'username', 'favorite', 'color', 'group'])
                writer.writerows(decoded_data)

            rjson = {'success': True}
            
        except Exception as error:rjson = {'success': False, 'error': str(error)} 

        return json.dumps(rjson)