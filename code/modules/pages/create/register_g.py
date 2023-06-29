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

class FA_CreateGroup:

    @staticmethod
    def create_group(password, username, namegroup):
        
        decrypt_password, new_group = d(password), str(d(namegroup))

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:
            
            try:kp = pykeepass.PyKeePass(f'ddbb/kdbx/{username}.kdbx', password=decrypt_password)
            except Exception as error:return {'success': e(str(False)), 'error': e(f"500 Internal Error. {error}")}
            
            try:kp.add_group(kp.root_group, new_group);kp.save()
            except Exception as create_group_error:return {'success': e(str(False)), 'error': e(f"500 Internal Error. {create_group_error}")}
            
            return {'success': e(str(True))}
        
        else:return {'success': e(str(False)), 'error': e("Username Don't exists.")}