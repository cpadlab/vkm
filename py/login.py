import sys, configparser
import sqlite3
from functionalities.decrypt import decrypt

class getArgvs:
    
    def __init__(self) -> None:
        
        self.login_username = sys.argv[1]
        self.login_password = sys.argv[2]

    def getPassword(username,ddbb):
        
        conn = sqlite3.connect(ddbb)
        c = conn.cursor()
    
        c.execute("SELECT password FROM info WHERE username = ?", (username,))

        password = c.fetchone()
        conn.close()

        return password
        
class Token:

    def getKey(username, ddbb):

        conn = sqlite3.connect(ddbb)
        c = conn.cursor()

        c.execute("SELECT key FROM info WHERE username = ?", (username,))

        key = c.fetchone()
        conn.close()

        return key
    
class Check:

    def exists(username, ddbb='../sqlite3/users/users.sqlite3'):

        conn = sqlite3.connect(ddbb)
        c = conn.cursor()

        c.execute("SELECT COUNT(*) FROM users WHERE username = ?", (username,))

        result = c.fetchone()
        conn.close()

        if result[0] == 1:return True
        else: return False

class Main:
    
    def __init__(self) -> None:

        users_db = '../sqlite3/users/users.sqlite3'
        argsv = getArgvs()       

        if Check.exists(argsv.login_username, users_db):

            user_ini = '../about/users/users.ini'

            user_parser = configparser.ConfigParser()
            user_parser.read(user_ini)

            status = user_parser.get(argsv.login_username, 'status')

            if status == 'active':

                user_db = f'../sqlite3/users/{argsv.login_username}/vault.sqlite3'
                key = Token.getKey(argsv.login_username, user_db)[0].decode()
                
                ddbbpassword = decrypt(getArgvs.getPassword(argsv.login_username, user_db)[0].encode(),key)

                if argsv.login_password == ddbbpassword:

                    from datetime import datetime

                    user_parser.set(argsv.login_username, 'left', '5')
                    user_parser.set(argsv.login_username, 'last', str(datetime.now()))
                    user_parser.write(open(user_ini, 'w'))

                    with open('../temp/sesion.tmp', 'w') as login_file: 
                        login_file.write(f"""[Sesion]
username = {argsv.login_username}
Start_at = {datetime.now()}""")

                    print(True)

                else:

                    left = int(user_parser.get(argsv.login_username, 'left'))
                    nwleft = str(left-1)

                    if int(nwleft) <= 0:
                        user_parser.set(argsv.login_username, 'status', 'block')
                    user_parser.set(argsv.login_username, 'left', nwleft) 

                    user_parser.write(open(user_ini, 'w'))

                    print("False > Wrong password")
            
            elif status == 'block':print("False > Blocked account")
            else:print("False > Error status")

        else:print("False > Does not exist")
        
if __name__ == '__main__':
    Main()