#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

import sqlite3
from ..core import config

def _createTables(path:str=config.DDBB_FILE_PATH):

    conn = sqlite3.connect(path)
    c = conn.cursor()

    c.execute('''CREATE TABLE IF NOT EXISTS vkm_sesions
                 (cookie BLOB, active BOOL, username TEXT)''')

    c.execute('''CREATE TABLE IF NOT EXISTS vkm_auth
                 (token BLOB)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS vkm_users
        (username TEXT, password TEXT)''')

    conn.commit();conn.close()