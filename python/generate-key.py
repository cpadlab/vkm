# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/VKM2Login
# Follow me >> https://twitter.com/codewual

import sys, random

class Main:
    
    def __init__(self) -> None:
        
        option = sys.argv[1]
        length = int(sys.argv[2])
         
        password = Main.generateKey(option, length)
        print(password)

    def generateKey(option, length):
        
        lists = Main.getStr(option)
        password=""
        
        for x in range(length):
            a = random.choice(str(lists))
            password += a
    
        return password
        
    def getStr(option):
        options = {
            "Letters": "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz",
            "+Numbers": "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789",
            "+Characters": "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz0123456789ºª!|·#$%&¬/()=?¿¡.:-_,;*{,}ç^[+]"
        }
        
        return options.get(option, "") 

if __name__ == '__main__':
    Main()