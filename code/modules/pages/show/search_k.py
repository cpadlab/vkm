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

class FA_FindKey:

    @staticmethod
    def find_key(password, username, code):
        
        decrpyt_password = d(password)

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:

            try:kp = pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=decrpyt_password)
            except pykeepass.pykeepass.CredentialsError: return {'success': e(str(False)), 'error': e("Credentials Error.")}
                
            try:
                entry = kp.find_entries_by_notes(notes=code, first=True)
                kp.save()

                if entry:
                    if entry.group == kp.root_group:group = "Main"
                    else:group = entry.group
                    nlist = [e(str(entry.title)),e(str(entry.url)),e(str(entry.username)),e(str(entry.password)),e(str(group))]
                else:return {'success': e(str(True)), 'exists': e(str(False))}
                
            except Exception as error:return {'success': e(str(False)),  'error': e(f"500 Internal Error. {error}")}

            return {'success': e(str(True)), 'key': nlist, 'exists': e(str(True))}
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}