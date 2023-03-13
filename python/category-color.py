   
# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/VKM2Login
# Follow me >> https://twitter.com/codewual

import sys, sqlite3, os

class Main:
    
    def __init__(self) -> None:

        ddbbName = sys.argv[1]
        user = sys.argv[2]
        passwd = sys.argv[3]
        site = sys.argv[4]
        
        category = Main.getCategory(os.path.join("C:/xampp/htdocs/vkm/database/users", ddbbName, "database.db"), user, passwd, site)
        print(category)

    def getCategory(ddbbName, user, passwd, site):
        conexion = sqlite3.connect(ddbbName)
        cursor = conexion.cursor()
        
        cursor.execute("SELECT category FROM keys WHERE user = ? AND site = ? AND password = ?", (user, site, passwd))
        result = cursor.fetchone() 
        
        return result[0]

if __name__ == '__main__':
    Main()