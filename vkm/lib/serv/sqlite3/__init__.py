#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

import sqlite3, base64
from ...core import config

class SQLite3:

    def __init__(self, filepath:str=config.DDBB_FILE_PATH) -> None:
        
        try:
        
            self.conn = sqlite3.connect(filepath)
            self.c = self.conn.cursor()
        
        except sqlite3.Error as e:print("[Err] ", e)

    class Sesion:

        def registerToken(self, token:bytes):
            
            try:
                self.c.execute("INSERT INTO vkm_auth (token) VALUES (?)", (token,))
                self.conn.commit();self.conn.close();return True, 
            except sqlite3.Error as e:return False, e

        def getLastToken(self):
            
            try:
                latest_token = self.c.execute("SELECT token FROM vkm_auth ORDER BY rowid DESC LIMIT 1").fetchone()
                if latest_token:return latest_token[0], 
                else:return None, 
            
            except sqlite3.Error as e:return None, e

        def checkActiveCookie(self, cookie):
            cookie = cookie.encode()
            
            try:
                self.c.execute("SELECT active FROM vkm_sesions WHERE cookie = ?", (cookie,))
                result = self.c.fetchone()

                if result:return (True,)  if result[0] == True else (False, 'Session has expired.')
                else:return False, 'The cookie does not exist.'
            except sqlite3.Error as e:return False, e
    
        def registerCookie(self, cookie:bytes, username:str, active:bool=True):
            try:
                if SQLite3.Sesion.deactivateCookie(self=self, username=username) == False:return False
                
                self.c.execute("INSERT INTO vkm_sesions (cookie, active, username) VALUES (?, ?, ?)",
                    (cookie, active, username))
                self.conn.commit();self.conn.close();return True

            except sqlite3.Error as e:return False

        def deactivateCookie(self, username:str):
                try:
                    self.c.execute("UPDATE vkm_sesions SET active = ? WHERE username = ?", (False, username))
                    self.conn.commit();return True

                except sqlite3.Error as e:return False

    class Account:

        def registerUsername(self, username:str, password:str):
            username = username.lower()

            try:
                if SQLite3.Account.checkExistsUsername(self=self, username=username) != False:return False, 'The user already exists.'
                
                self.c.execute(f'''CREATE TABLE IF NOT EXISTS vkm_{username}_groups
                            (group_name TEXT, group_color TEXT)''')

                self.c.execute(f'''CREATE TABLE IF NOT EXISTS vkm_{username}_keys
                    (key_code INTEGER PRIMARY KEY AUTOINCREMENT, key_title TEXT, key_url TEXT, key_password TEXT, key_username TEXT,
                    key_favorite BOOLEAN, group_color TEXT, group_name TEXT,
                    FOREIGN KEY (group_name) REFERENCES vkm_{username}_groups(group_name),
                    FOREIGN KEY (group_color) REFERENCES vkm_{username}_groups(group_color))''')

                
                encoded_password = base64.b64encode(password.encode()).decode()
                self.c.execute("INSERT INTO vkm_users (username, password) VALUES (?, ?)",
                    (username, encoded_password))

                self.conn.commit();self.conn.close();return True,

            except sqlite3.Error as e:return False, e
        
        def checkExistsUsername(self, username:str):
            username = username.lower()
            
            try:
                self.c.execute("SELECT * FROM vkm_users WHERE username=?", (username,))
                exists = self.c.fetchone() is not None;return exists

            except sqlite3.Error as e:return False

        def getUsernameByCookie(self, cookie:str):
            try:
                cac = SQLite3.Sesion.checkActiveCookie(self=self, cookie=cookie)
                if cac[0] == False:return cac[1]

                cookie = cookie.encode()

                self.c.execute("SELECT username FROM vkm_sesions WHERE cookie = ?", (cookie,))
                result = self.c.fetchone();return (result[0], ) if result else (None, 'User not found.')
            except sqlite3.Error as e:return None, e

        def checkCredentials(self, username:str, password:str):
            username = username.lower()

            try:
                if SQLite3.Account.checkExistsUsername(self=self, username=username) == False:return False, 'The user does not exist.'

                self.c.execute("SELECT password FROM vkm_users WHERE username=?", (username,))
                stored_password = self.c.fetchone()[0]

                if password == base64.b64decode(stored_password.encode()).decode():
                    
                    from vkm.lib.utils.token import _generateToken
                    _cookie = _generateToken()

                    if SQLite3.Sesion.registerCookie(self=self, cookie=_cookie, username=username) == True:return True, _cookie
                    else:return False, 'Could not register the session cookie.'

                else:return False, 'Incorrect password.'
                
            except sqlite3.Error as e:return False, e

        def modifyUsername(self, cookie:str, newusername:str):
            oldusername = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if oldusername[0] == None:return False, oldusername[1]
            else: oldusername = oldusername[0]

            newusername = newusername.lower()
            if SQLite3.Account.checkExistsUsername(self=self, username=oldusername) == False:return False, 'The user does not exist.'
            if SQLite3.Account.checkExistsUsername(self=self, username=newusername) == True:return False, 'The user alredy exists.'

            try:
                
                self.c.execute("UPDATE vkm_users SET username = ? WHERE username = ?", (newusername, oldusername))
                self.c.execute("ALTER TABLE vkm_" + oldusername + "_keys RENAME TO vkm_" + newusername + "_keys")
                self.c.execute("ALTER TABLE vkm_" + oldusername + "_groups RENAME TO vkm_" + newusername + "_groups")
                self.c.execute("UPDATE vkm_sesions SET username = ? WHERE username = ?", (newusername, oldusername))
        
                self.conn.commit();self.conn.close();return True,
        
            except sqlite3.Error as e:return False, e

        def modifyUsernamePassword(self, cookie:str, newpassword:str):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                encoded_newpassword = base64.b64encode(newpassword.encode()).decode()
                self.c.execute("UPDATE vkm_users SET password = ? WHERE username = ?", (encoded_newpassword, username))
                self.conn.commit();self.conn.close();return True,
            except sqlite3.Error as e:return False, e

        def deleteUsername(self, cookie:str):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                self.c.execute("DELETE FROM vkm_users WHERE username = ?", (username,))
                self.c.execute("DROP TABLE IF EXISTS vkm_" + username + "_keys")
                self.c.execute("DROP TABLE IF EXISTS vkm_" + username + "_groups")
                self.c.execute("DELETE FROM vkm_sesions WHERE username = ?", (username,))

                self.conn.commit();self.conn.close();return True, 

            except sqlite3.Error as e:return False, e

        def getPassword(self, cookie):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                
                self.c.execute("SELECT password FROM vkm_users WHERE username = ?", (username,))
                password = base64.b64decode(self.c.fetchone()[0].encode()).decode()
                self.conn.close();return True, password

            except sqlite3.Error as e:return False, e

    class Group:

        def check(self, username:str, groupname:str):
            try:
                self.c.execute(f"SELECT COUNT(*) FROM vkm_{username}_groups WHERE group_name = ?", (groupname,))
                return self.c.fetchone()[0] > 0, True
            except sqlite3.Error as e:return False, e

        def delete(self, cookie:str, groupname:str):

            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Group.check(self=self, username=username, groupname=groupname)[0] == False:return False, 'The group does not exist.'

            try:
                self.c.execute(f"DELETE FROM vkm_{username}_keys WHERE group_name=?", (groupname,))
                self.c.execute(f"DELETE FROM vkm_{username}_groups WHERE group_name=?", (groupname,))
                self.conn.commit();self.conn.close();return True,
            except sqlite3.Error as e:return False, e

        def add(self, cookie:str, groupname:str, color:str="#8338ec"):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Group.check(self=self, username=username, groupname=groupname)[0] == True:return False, 'The group already exists.'

            try:
                self.c.execute(f"INSERT INTO vkm_{username}_groups (group_name, group_color) VALUES (?, ?)",
                    (groupname, color))
                self.conn.commit();self.conn.close();return True, 
            except sqlite3.Error as e:return False, e
        
        def modify(self, cookie:str, newgroupname:str, oldgroupname:str, newcolor:str="#8338ec"):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Group.check(self=self, username=username, groupname=oldgroupname)[0] == False:return False, 'The group does not exist.'
            
            try:
                self.c.execute(f"UPDATE vkm_{username}_groups SET group_color = ? WHERE group_name = ?",
                    (newcolor, oldgroupname))
                self.c.execute(f"UPDATE vkm_{username}_groups SET group_name = ? WHERE group_name = ?",
                    (newgroupname, oldgroupname))
                self.conn.commit();self.conn.close();return True, 
            except sqlite3.Error as e:return False, e

        def get(self, cookie:str):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                self.c.execute(f"SELECT group_name FROM vkm_{username}_groups")
                groups = [row[0] for row in self.c.fetchall()]
                self.conn.close();return True, groups
            except sqlite3.Error as e:return False, e

        def getColor(self, username:str, groupname:str):

            if SQLite3.Group.check(self=self, username=username, groupname=groupname) == False:return False, 'The group does not exist.'

            try:
                self.c.execute(f"SELECT group_color FROM vkm_{username}_groups WHERE group_name = ?", (groupname,))
                color = self.c.fetchone();return color[0] if color else "#8338ec"
            except sqlite3.Error as e:return False, e

    class Key:

        def check(self, username:str, key_title:str, key_username:str):
            try:
                self.c.execute(f"SELECT COUNT(*) FROM vkm_{username}_keys WHERE key_title = ? AND key_username = ?",
                    (key_title, key_username))
                return self.c.fetchone()[0] > 0, True
            except sqlite3.Error as e:return False, e
        
        def checkByCode(self, username:str, key_code:int):
            try:
                self.c.execute(f"SELECT COUNT(*) FROM vkm_{username}_keys WHERE key_code = ?", (key_code,))
                return self.c.fetchone()[0] > 0, True
            except sqlite3.Error as e:return False, e

        def delete(self, cookie:str, key_code:int):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Key.checkByCode(self=self, username=username, key_code=key_code)[0] == False:return False, 'The key does not exist.'
            
            try:
                self.c.execute(f"DELETE FROM vkm_{username}_keys WHERE key_code=?", (key_code,))
                self.conn.commit();self.conn.close();return True, 
            except sqlite3.Error as e:return False, e
        
        def add(self, cookie:str, key_title:str, key_password:str, 
                key_username:str, group_name:str, key_url:str="",
                key_favorite:bool=False,
            ):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Key.check(self=self, username=username, 
                key_title=key_title, key_username=key_username)[0] == True:return False, 'The key already exists.'

            group_color = SQLite3.Group.getColor(self=self, username=username, groupname=group_name)
            encoded_key_password = base64.b64encode(key_password.encode()).decode()
            try:
                self.c.execute(f'''INSERT INTO vkm_{username}_keys (key_title, key_url, key_password, key_username, key_favorite, group_color, group_name) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)''', 
                    (key_title, key_url, encoded_key_password, key_username, key_favorite, group_color, group_name))
                key_code = self.c.lastrowid;self.conn.commit();self.conn.close();return True, key_code
            except sqlite3.Error as e:return False, e
    
        def modify(self, cookie:str, key_code:int, key_title:str=None, key_password:str=None, 
                key_username:str=None, group_name:str=None, key_url:str=None,
                key_favorite:bool=None,
            ):

            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Key.checkByCode(self=self, username=username, key_code=key_code)[0] == False:return False, 'The key does not exist.'

            columns = [];values = []
            
            if key_title is not None:columns.append('key_title');values.append(key_title)
            if key_username is not None:columns.append('key_username');values.append(key_username)
            if key_url is not None:columns.append('key_url');values.append(key_url)
            if key_favorite is not None:columns.append('key_favorite');values.append(key_favorite)
            if group_name is not None:columns.append('group_name');values.append(group_name)
            if key_password is not None:
                encoded_key_password = base64.b64encode(key_password.encode()).decode()
                columns.append('key_password');values.append(encoded_key_password)
            
            try:
                if columns:
                    query = f'''UPDATE vkm_{username}_keys SET {'=?, '.join(columns)}=? WHERE key_code=?'''
                    values.append(key_code);self.c.execute(query, tuple(values))
                self.conn.commit();self.conn.close();return True,
            except sqlite3.Error as e:return False, e

        def count(self, cookie:str):

            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]
            
            try:
                self.c.execute(f"SELECT COUNT(*) FROM vkm_{username}_keys")
                total_keys = self.c.fetchone()[0];self.conn.close();return True, total_keys
            except sqlite3.Error as e:return False, e

        def getFavorites(self, cookie:str):

            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                self.c.execute(f"SELECT * FROM vkm_{username}_keys WHERE key_favorite = 1")
                favorites = self.c.fetchall();self.conn.close();return True, favorites
            except sqlite3.Error as e:return False, e

        def getByGroup(self, cookie:str, group_name:str):

            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            if SQLite3.Group.check(self=self, username=username, groupname=group_name)[0] == False:return False, 'The group does not exist.'

            try:
                self.c.execute(f"SELECT * FROM vkm_{username}_keys WHERE group_name = ?", (group_name,))
                keys = self.c.fetchall();self.conn.close();return True, keys
            except sqlite3.Error as e:return False, e

        def get(self, cookie:str, code:int):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                self.c.execute(f"SELECT * FROM vkm_{username}_keys WHERE key_code = ?", (code,))
                key = self.c.fetchone();self.conn.close();return True, key
            except sqlite3.Error as e:return False, e

        def search(self, cookie:str, search:str):
            
            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                self.c.execute(f"SELECT * FROM vkm_{username}_keys WHERE key_title LIKE ? OR key_url LIKE ? OR key_username LIKE ?", ('%' + search + '%', '%' + search + '%', '%' + search + '%'))
                keys = self.c.fetchall();self.conn.close();return True, keys
            except sqlite3.Error as e:return False, e

        def export(self, cookie:str):

            username = SQLite3.Account.getUsernameByCookie(self=self, cookie=cookie)
            if username[0] == None:return False, username[1]
            else: username = username[0]

            try:
                self.c.execute(f"SELECT * FROM vkm_{username}_keys")
                keys = self.c.fetchall();self.conn.close();return True, keys
            except sqlite3.Error as e:return False, e