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
        dic = Main.getKeys(os.path.join("C:/xampp/htdocs/vkm/database/users", ddbbName, "database.db"))
        print(json.dumps(dic))

    def getKeys(ddbbName):
        conexion = sqlite3.connect(ddbbName)
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM keys")
        filas = cursor.fetchall()
        
        dic= {}
        for fila in filas:
            dic[fila[2]] = fila[0], fila[1]
        
        conexion.close()
        return dic

if __name__ == '__main__':
    Main()