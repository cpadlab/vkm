from cryptography.fernet import Fernet

def decrypt(encrypted:bytes, key:bytes) -> str:
    fernet = Fernet(key)
    decrypted = fernet.decrypt(encrypted).decode()
    return decrypted