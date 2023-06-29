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

import pykeepass

from modules.common.rot13 import Encrypt as e
from modules.common.rot13 import Decrypt as d
from modules.common.files import file_exist as fe

class FA_CountKeys:

    @staticmethod
    def count_keys(password, username):

        decrypt_password = d(password)

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:
            
            try:db = pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=decrypt_password)
            except:return {'success': e(str(False)), 'error': e("500 Internal Error.")}
        
            return {'success': e(str(True)), 'total': len(db.entries)}
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}
