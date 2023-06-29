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

class FA_RegisterKey:
    
    @staticmethod
    def code_key(db):
        return str(int(len(db.entries)) + 1)
    
    @staticmethod
    def add_key_tovault(password, username, inputTitle, inputURL,
        selectGroup, inputUsername, inputPassword
    ):

        decrypt_password = d(password)
        key_title, key_username, key_password, key_url  = str(d(inputTitle)), str(d(inputUsername)), str(d(inputPassword)), str(d(inputURL))

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:

            try:kp = pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=decrypt_password)
            except pykeepass.pykeepass.CredentialsError: return {'success': e(str(False)), 'error': e("Credentials Error.")}
                
            if d(selectGroup) == "Main":group = kp.root_group
            else:group  = kp.find_groups(name=f"{d(selectGroup)}", first=True)
            
            try:kp.add_entry(destination_group=group,title=key_title,username=key_username,password=key_password,url=key_url,notes=FA_RegisterKey.code_key(kp));kp.save()
            except Exception as error:return {'success': e(str(False)), 'error': e(f"500 Internal Error. {error}")}

            return {'success': e(str(True))}
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}
