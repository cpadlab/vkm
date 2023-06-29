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

class FA_GetGKeys:

    @staticmethod
    def get_group_keys(password, username, groupname):

        decrypt_password, decrypt_groupname = d(password), d(groupname)
        finally_dictionary = []

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:
            
            try:db = pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=decrypt_password)
            except:return {'success': e(str(False)), 'error': e("500 Internal Error.")}

            entries = db.find_groups(name=decrypt_groupname, first=True).entries
            
            if len(entries) == 0:return {'success': e(str(True)), 'keys': e(str(finally_dictionary)), 'empty': e(str(True))}
            else: 
                for entry in entries:
                    nlist = [e(str(entry.title)), e(str(entry.url)), e(str(entry.username)), e(str(entry.password)), str(entry.notes),]
                    finally_dictionary.append(nlist)

                return {'success': e(str(True)), 'keys': e(str(finally_dictionary)), 'empty': e(str(False))}
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}