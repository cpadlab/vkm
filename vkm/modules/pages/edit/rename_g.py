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

class FA_RenameGroup:

    @staticmethod
    def rename_grp(password, username, groupname, newname):

        groupname, newname, decrypt_password = d(groupname), d(newname), d(password)

        if fe(filename='ddbb/kdbx/' + str(username) + ".kdbx") == True:
            
            try:
                db = pykeepass.PyKeePass('ddbb/kdbx/' + str(username) + ".kdbx", password=decrypt_password)
                
                group = db.find_groups(name=groupname, first=True)
                new_group = db.add_group(db.root_group, newname)

                for entry in group.entries:db.move_entry(entry, new_group)

                try:db.delete_group(group);db.save()
                finally:return {'success': e(str(True))}
                    
            except Exception as error:return {'success': e(str(False)), 'error': e(f"500 Internal Error. {error}")}
        
        else:return {'success': e(str(False)), 'error': e("Username don't exists.")}
