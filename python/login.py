# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/VKM2Login
# Follow me >> https://twitter.com/codewual

import sys, csv

class Main:
    
    def __init__(self) -> None:
        
        username = sys.argv[1]
        password = sys.argv[2]
        #with open(f'{username}.txt', 'w') as w:
        #    w.write(f"{username}, {password}")
         
        if Main.checkAccess(username, password) == True:print("True")
        else:print("False")

    def checkAccess(username, password):
    
        try:
            with open('C:/xampp/htdocs/vkm/database/users.csv', 'r') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    if row['username'] == username and row['password'] == password:
                        return True
        except FileNotFoundError as e:
            return None, e
        return False

if __name__ == '__main__':
    Main()