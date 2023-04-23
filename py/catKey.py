import sys, sqlite3, os, json
from functionalities.decrypt import decrypt

class Main:
    
    def __init__(self) -> None:
        
        username = sys.argv[1]
        category = sys.argv[2]

        user_db = f'../sqlite3/users/{username}/vault.sqlite3'
        dic = Main.getKeys(user_db, category)
        print(json.dumps(dic))

    def getKeys(username, category):
        conn = sqlite3.connect(username)
        c = conn.cursor()

        key = [fila for fila in c.execute("SELECT key FROM info")][0][0]
        
        results = c.execute("SELECT code, site, username, password, url FROM vault WHERE category = ?", (category,))

        dic = {}

        for row in results:
            
            dic[str(decrypt(row[1],key))] = (row[0],
                str(decrypt(row[1],key)),
                str(decrypt(row[3],key)), 
                str(decrypt(row[4],key)), 
                str(decrypt(row[2],key)))

        conn.close()

        return dic

if __name__ == '__main__':
    Main()