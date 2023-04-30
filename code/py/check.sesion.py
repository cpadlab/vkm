# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/VKM2Login
# Follow me >> https://twitter.com/codewual

import os, configparser, datetime

class Main:
    
    def __init__(self) -> None:
        
        file_path = "../temp/sesion.tmp";
        limit = datetime.timedelta(minutes=10)

        if os.path.isfile(file_path):
            config = configparser.ConfigParser()
            config.read(file_path)

            if "Sesion" in config.sections() and "Start_at" in config["Sesion"]:
                start_at = datetime.datetime.fromisoformat(config["Sesion"]["Start_at"])
                tt = datetime.datetime.now() - start_at

                if tt > limit:
                    os.remove(file_path)
                    print(True)
                else:print(False)

            else:print(True)
        else:print(True)

if __name__ == '__main__':
    Main()