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

class FA_CheckLogin:

    @staticmethod
    def check_access(password, username):

        decrypt_password = d(password)

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:
            
            try:pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=decrypt_password)
            except pykeepass.pykeepass.CredentialsError: return {'success': e(str(False)), 'error': e("Credentials Error.")}
            except Exception as error:return {'success': e(str(False)), 'error': e(f"500 Internal Error. {error}")}
            return {'success': e(str(True))}
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}
