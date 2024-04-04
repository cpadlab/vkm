#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

__all__ = ['VKM', '_KeyboardInterrupt']

from .lib.core import config
from .lib.utils.file import File
import sys, os, argparse

def _KeyboardInterrupt():
    print("="*config.SEPARATOR)
    original_stdout = sys.stdout
    try:
        sys.stdout = open(os.devnull, 'w')
        from .lib.utils.process import getProcessID, killProcess
        killProcess(pid=getProcessID(), signal=config.KILL_SIGNAL)
    except:sys.exit(0)
    finally:sys.stdout = original_stdout

class VKM:

    def __init__(self, action:str=config.DEFAULT_ACTION, 
        host:str=config.HT_HOST, port:int=config.HT_PORT, 
        certfile:str=config.SSL_CERT_PATH, keyfile:str=config.SSL_KEY_PATH
    ):

        config.HT_HOST = host if host and type(host) == str else config.HT_HOST
        config.HT_PORT = port if port and type(port) == int else config.HT_PORT
        config.SSL_CERT_PATH = certfile if certfile and File.checkExists(path=certfile) else config.SSL_CERT_PATH
        config.SSL_KEY_PATH = keyfile if keyfile and File.checkExists(path=keyfile) else config.SSL_KEY_PATH
        self.action = action if action in config.VALID_ACTIONS else config.DEFAULT_ACTION

        self.parser = argparse.ArgumentParser(description="Descripción de tu programa")
        self.parser.add_argument("--setup", action="store_true", help="Setup DDBB")
        self.parser.add_argument("--start", action="store_true", help="Start Servs")

    def run(self):
        
        from .lib.boot import Boot as b
        args = self.parser.parse_args()

        if args.setup:
            from .lib.utils.setup import _createTables
            _createTables()
        elif args.start:b()
        else:b()

        