from .core import config
import threading, sys

def printBanner():
    print(f"{'='*config.SEPARATOR}\n"
        f"{config.VKM_TITLE}v{config.VKM_VERSION}       {config.AUTHOR} ({config.NICKNAME})\n"
        f"{'='*config.SEPARATOR}\n"
        f"{config.BANNER}\n"
        f"{'='*config.SEPARATOR}")

class Boot:

    def __init__(self) -> None:
        
        printBanner()

        from .utils.token import _generateToken
        session_token = _generateToken(length=int(config.LENGTH_TOKEN))

        try:
            from .utils.requirements import Requirements
            if  Requirements().check == False:
                raise Exception("Execute vkm.py --setup to configure VKM")
        except Exception as error:
            print(error);sys.exit(0)

        from .serv.sqlite3 import SQLite3
        sq = SQLite3()
        SQLite3.Sesion.registerToken(self=sq, token=session_token)

        from .serv import fastapi, https

        fat = threading.Thread(target=fastapi.run)
        htt = threading.Thread(target=https.Https().run)

        fat.start()
        htt.start()

        fat.join()
        htt.join()