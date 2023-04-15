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

        key = [fila[0] for fila in c.execute("SELECT key FROM info")]
        results = c.execute("SELECT code, site, username, password, url, category FROM vault").fetchall()

        dic = {}

        for row in results:
            dic[row[4]] = (row[0], decrypt(row[1],key), decrypt(row[3],key), decrypt(row[4],key), decrypt(row[2],key), row[5])

        conn.close()

        return dic

if __name__ == '__main__':
    Main()