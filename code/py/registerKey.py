
import sys, configparser
import sqlite3
from functionalities.encrypt import encrypt

class getArgvs:
    
    def __init__(self) -> None:
        
        self.username = sys.argv[1]
        self.innwpswsite_name = sys.argv[2]
        self.innwpswsite_url = sys.argv[3]
        self.innwpswsite_username = sys.argv[4]
        self.innwpswsite_password = sys.argv[5]
        self.innwpswsite_cat = sys.argv[7]

class Check:

    def exists(username, site, ddbb):

        conn = sqlite3.connect(ddbb)
        c = conn.cursor()

        c.execute("SELECT * FROM vault WHERE site=? AND username=?", (site, username))
        row = c.fetchone()

        if row is None:return True
        else:return False

    def getCount(ddbb):
    
        conn = sqlite3.connect(ddbb)
        c = conn.cursor()

        c.execute("SELECT COUNT(*) FROM vault")
        count = c.fetchone()[0]

        conn.close()

        return int(count) + 1
    
    def getKey(ddbb):
        conn = sqlite3.connect(ddbb)
        c = conn.cursor()
        return [row for row in c.execute("SELECT key FROM info")][0][0]


class Main:
    
    def __init__(self) -> None:

        argsv = getArgvs()       
        user_db = f'../sqlite3/users/{argsv.username}/vault.sqlite3'
        key = Check.getKey(user_db)

        if Check.exists(argsv.innwpswsite_username, argsv.innwpswsite_name, user_db) == True:

            conn = sqlite3.connect(user_db)
            cursor = conn.cursor()

            code = Check.getCount(user_db)
            site_name = encrypt(argsv.innwpswsite_name, key)
            site_url = encrypt(argsv.innwpswsite_url, key)
            site_username = encrypt(argsv.innwpswsite_username, key)
            site_password = encrypt(argsv.innwpswsite_password , key)
            site_category = argsv.innwpswsite_cat

            cursor.execute("INSERT INTO vault (code, site, url, username, password, category) VALUES (?, ?, ?, ?, ?, ?)", 
                        (code, site_name, site_url, site_username, site_password, site_category))

            try:conn.commit()
            except:
                print(False)
                sys.exit()
            finally:conn.close()

            print(True)

        else:print(False)
        
if __name__ == '__main__':
    Main()