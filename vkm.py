#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

from vkm import VKM, _KeyboardInterrupt

if __name__ == '__main__':
    try:VKM().run()
    except:_KeyboardInterrupt()
