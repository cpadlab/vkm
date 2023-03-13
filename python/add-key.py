# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/vkm
# Follow me >> https://twitter.com/codewual

import sys, os, sqlite3

class Main:
    
    def __init__(self) -> None:
        
        #$ddbb $username $category $url $site $password"
        ddbb = sys.argv[1]
        username = sys.argv[2]
        category = sys.argv[3]
        url = sys.argv[4]
        site = sys.argv[5]
        password = sys.argv[6]
         
        execode = Main.addtoVault(os.path.join("C:/xampp/htdocs/vkm/database/users", ddbb, "database.db"), username, category, url, site, password)
        print(execode)

    def addtoVault(ddbb, username, category, url, site, password):
        
        conn = sqlite3.connect(ddbb)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO keys (user, category, url, site, password) VALUES (?, ?, ?, ?, ?)", (username, category, url, site, password))
        conn.commit()
        conn.close()
        return True

if __name__ == '__main__':
    Main()