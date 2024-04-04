#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

from ..core import config
from cryptography.fernet import Fernet

def _generateToken(length:int=config.LENGTH_TOKEN):
    return Fernet.generate_key()