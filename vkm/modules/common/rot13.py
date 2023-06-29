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

import codecs 

@staticmethod
def Encrypt(text:str):return codecs.encode(text, 'rot_13')

@staticmethod
def Decrypt(cipher:str):return codecs.decode(cipher, 'rot_13')
    