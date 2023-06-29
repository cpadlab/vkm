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

import random
import string

from modules.common.rot13 import Encrypt as e

class FA_GenerateCustomPassword:

    def get_random_password(lengh, types):

        types = float(types)

        if types == 1.0:all_characters = string.ascii_letters 
        elif types == 1.5:all_characters = string.digits 
        elif types == 1.75:all_characters = string.punctuation
        elif types == 2.5:all_characters = string.ascii_letters + string.digits 
        elif types == 2.75:all_characters = string.ascii_letters + string.punctuation
        elif types == 3.25:all_characters = string.punctuation + string.digits 
        elif types == 4.25:all_characters = string.punctuation + string.digits + string.ascii_letters 
        else: all_characters = string.punctuation + string.digits + string.ascii_letters 

        random_password = ''.join(random.choice(all_characters) for _ in range(int(lengh)))
        return e(random_password)

