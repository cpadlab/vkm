# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/VKM2Login
# Follow me >> https://twitter.com/codewual

import sys, sqlite3, os, json

class Main:
    
    def __init__(self) -> None:
        
        ddbbName = sys.argv[1]
        search = sys.argv[2]
        dic = Main.getKeys(os.path.join("C:/xampp/htdocs/vkm/database/users", ddbbName, "database.db"), search)
        print(json.dumps(dic))

    def getKeys(ddbbName, search):
        conexion = sqlite3.connect(ddbbName)
        cursor = conexion.cursor()
        
        query = f"SELECT * FROM keys WHERE site LIKE '%{search}%' OR user LIKE '%{search}%' OR url LIKE '%{search}%'"
        cursor.execute(query)
        results = cursor.fetchall()
        
        dic= {}
        for row in results:
            dic[row[2]] = row[0], row[1]
        
        conexion.close()
        return dic

if __name__ == '__main__':
    Main()