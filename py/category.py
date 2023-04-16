import sys, sqlite3, os, json
from functionalities.decrypt import decrypt

class Main:
    
    def __init__(self) -> None:
        
        username = sys.argv[1]
        user_db = f'../sqlite3/users/{username}/vault.sqlite3'
        dic = Main.getCats(user_db)
        print(json.dumps(dic))

    def getCats(username):
        conn = sqlite3.connect(username)
        c = conn.cursor()
        
        rows = c.execute("SELECT * FROM categories")

        dic = []

        for row in rows:
            dic.append(row)

        conn.close()

        return dic

if __name__ == '__main__':
    Main()