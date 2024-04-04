#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

import configparser, os
from ..utils.file import File

try:
    
    PATH = os.path.dirname(os.path.abspath(__file__))
    ROOT_PATH = File.parent(PATH, depth=2)

    # ---------- SETUP-PARSER ----------
    try:
        CONFIG_PATH = os.path.join(PATH, 'vkm.conf')
        config = configparser.ConfigParser()
        config.read(CONFIG_PATH)
    except FileNotFoundError as error:raise FileNotFoundError(error)
    except configparser.Error as error:raise configparser.Error(error)
    
    # ---------- Info ----------
    VKM_TITLE = config.get("info", "title", fallback="VKM")
    VKM_VERSION = config.get("info", "version", fallback="6")
    AUTHOR = config.get("info", "author", fallback="Carlos Padilla")
    NICKNAME = config.get("info", "nickname", fallback="cpadlab")
    SEPARATOR = config.getint("info", "separator", fallback=36)
    BANNER = """      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|
   code by cpadlab     
"""
    # ---------- General ----------
    LENGTH_TOKEN = config.getint("general", "length_token", fallback=32)
    KILL_SIGNAL = config.getint("general", "kill_signal", fallback=9)
    DEFAULT_ACTION = config.get("general", "default_action", fallback="start")
    VALID_ACTIONS = ['start', 'setup']
    EXPORT_FILE = config.get("general", "export_file", fallback="../../../include/assets/export.csv")

    # ---------- SQLite3 ----------
    DDBB_NAME = config.get("sql", "filename", fallback="vkm")
    DDBB_EXTENSION = config.get("sql", "extension", fallback="sqlite3")
    DDBB_PATH = config.get("sql", "path")
    DDBB_FILE_PATH = File.joinPath(PATH, DDBB_NAME + '.' + DDBB_EXTENSION)

    # ---------- SSL ----------
    SSL_CERT = config.get("ssl", "cert", fallback="lib/serv/certs/vkm.crt")
    SSL_KEY = config.get("ssl", "key", fallback="lib/serv/certs/vkm.key")

    SSL_CERT_PATH = File.joinPath(ROOT_PATH, SSL_CERT)
    SSL_KEY_PATH = File.joinPath(ROOT_PATH, SSL_KEY)
    FA_LOG_LEVEL = config.get("fastapi", "log_level", fallback='critical')
    
    # ---------- FastApi ----------
    FA_HOST = config.get("fastapi", "host", fallback="127.0.0.1")
    FA_PORT = config.getint("fastapi", "port", fallback=8000)

    # ---------- HTTP ----------
    HT_HOST = config.get("https", "host", fallback="127.0.0.1")
    HT_PORT = config.getint("https", "port", fallback=1014)
    SERVER_ADDRESS = (HT_HOST, HT_PORT)
    SERVER_SIDE = config.getboolean("https", "server_side", fallback=True)
    LISTING_PATH = File.parent(ROOT_PATH, depth=1)

    STATUS_CODES = {
        'Expired': 440,
        'Ok': 200,
        'Unkown': 520,
        'Unauthorized': 401,
        'BadRequest': 400
    }

except configparser.NoSectionError as error:raise configparser.NoSectionError(error)
except configparser.NoOptionError as error:raise configparser.NoOptionError(error)
except ValueError as error:raise ValueError(error)
except Exception as error:raise Exception(error)

def _setValue(section, option, value):
    
    try:
        
        tmp_config = configparser.ConfigParser()
        tmp_config.read(CONFIG_PATH)
        
        if section not in tmp_config:tmp_config.add_section(section)
        tmp_config.set(section, option, str(value))
        
        with open(CONFIG_PATH, 'w') as config_file:tmp_config.write(config_file)
        
    except FileNotFoundError as error:raise FileNotFoundError(error)
    except configparser.Error as error:raise configparser.Error(error)
    except Exception as error:raise Exception(error)
    
    
