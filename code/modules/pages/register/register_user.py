# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
#          (code by wual)

# VKM V5.0.6 | 2023 Summer Review 1
# Page >> https://14wual.github.io/vkm
# Code >> https://github.com/14wual/VKM
# Follow me >> https://twitter.com/14wual

import pykeepass, os

from modules.common.rot13 import Encrypt as e
from modules.common.rot13 import Decrypt as d

class FA_RegisterUsername:

    @staticmethod
    def check_if_exist(filename):

        files = os.listdir('ddbb/kdbx/')
        for file in files:
            if file == filename:return True

        return False

    @staticmethod
    def create_kdbx_file(password, username):

        decrypt_password = d(password)

        if FA_RegisterUsername.check_if_exist(filename=str(username) + ".kdbx") == False:
            
            try:db = pykeepass.create_database(f'ddbb/kdbx/{username}.kdbx', password=decrypt_password);db.save()
            except:return {'success': e(str(False)), 'error': e("500 Internal Error.")}
            return {'success': e(str(True))}
        
        else:return {'success': e(str(False)), 'error': e("Username already exists.")}

    