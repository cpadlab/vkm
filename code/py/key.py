import sys, sqlite3, os, json
from functionalities.decrypt import decrypt

class Main:
    
    def __init__(self) -> None:
        
        username = sys.argv[1]
        user_db = f'../sqlite3/users/{username}/vault.sqlite3'
        dic = Main.getKeys(user_db)
        print(json.dumps(dic))

    def getKeys(username):
        conn = sqlite3.connect(username)
        c = conn.cursor()

        key = [fila for fila in c.execute("SELECT key FROM info")][0][0]
        
        results = c.execute("SELECT code, site, username, password, url, category FROM vault").fetchall()

        dic = {}

        for row in results:
            
            dic[str(decrypt(row[1],key))] = (row[0],
                str(decrypt(row[1],key)),
                str(decrypt(row[3],key)), 
                str(decrypt(row[4],key)), 
                str(decrypt(row[2],key)), 
                row[5])

        conn.close()

        return dic

if __name__ == '__main__':
    Main()