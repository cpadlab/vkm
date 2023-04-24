from cryptography.fernet import Fernet

def encrypt(mes: str, key) -> bytes:
    fernet = Fernet(key)
    encrypted = fernet.encrypt(mes.encode())
    return (encrypted)