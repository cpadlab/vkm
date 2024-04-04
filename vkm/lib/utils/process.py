#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

import os, subprocess
from ..core import config

def getProcessID() -> int:return os.getpid()
def killProcess(pid:int, signal:int=config.KILL_SIGNAL):os.kill(pid, signal)