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

class FA_SearchKey:

    @staticmethod
    def find_key(password, username, search):

        dpassword, search = d(password), d(search)

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:

            try:kp = pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=dpassword)
            except pykeepass.pykeepass.CredentialsError: return {'success': e(str(False)), 'error': e("Credentials Error.")}
                
            try:
                entries = kp.find_entries(title=f'{search}*', regex=True)
                finally_dictionary = []

                if len(entries) == 0:return {'success': e(str(True)), 'empty': e(str(True))}
                else:

                    for entry in entries:
                        nlist = [e(str(entry.title)),e(str(entry.url)),e(str(entry.username)),e(str(entry.password)),str(entry.notes)]
                        finally_dictionary.append(nlist)
                    
                    return {'success': e(str(True)), 'keys': e(str(finally_dictionary)), 'empty': e(str(False))}

            except Exception as error:return {'success': e(str(False)),  'error': e(f"500 Internal Error. {error}")}
            
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}