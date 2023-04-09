import sys, os, configparser, hashlib, base64 

class getArgvs:
    
    def __init__(self) -> None:
        
        self.register_name = sys.argv[1]
        self.register_surname = sys.argv[2]
        self.register_username = sys.argv[3]
        self.register_mail = sys.argv[4]
        self.register_password = sys.argv[5]
        
class Token:

    def generateToken(username):
        username_md5 = hashlib.md5(username.encode()).digest()
        token = base64.b85encode(username_md5)
        return token

    def saveToken(token, username):
        save_toke_path = f'../temp/{username}.key'
        try:
            with open( save_toke_path, 'w') as save_token_file:
                save_token_file.write(token.decode())
        except:return False
        finally:return True

    def getToken(username):
        token = Token.generateToken(username)
        if Token.saveToken(token, username):return token
        else:return False

class Main:
    
    def __init__(self) -> None:
    
        argsv = getArgvs()       
        token = Token.getToken(argsv.register_name).decode()
        
        from cryptography.fernet import Fernet
        key = Fernet.generate_key()
            
        users_db = '../sqlite3/users/users.sqlite3'
        user_ini = '../about/users/users.ini'
        user_path = f'../sqlite3/users/{argsv.register_username}'
        user_db = f'../sqlite3/users/{argsv.register_username}/vault.sqlite3'
        os.mkdir(user_path)
        
        user_parser = configparser.ConfigParser()
        user_parser.read(user_ini)

        code_user = int(user_parser.get('users', 'total')) + 1
    
        import sqlite3
        from functionalities.encrypt import encrypt
        
        conn = sqlite3.connect(user_db)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS info (
                code TEXT,
                name TEXT,
                surname TEXT,
                username TEXT,
                mail TEXT,
                password TEXT,
                recovery_token TEXT,
                key TEXT
            )
        ''')

        cursor.execute('''
            INSERT INTO info (
                code,
                name,
                surname,
                username,
                mail,
                password,
                recovery_token,
                key
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            code_user,
            encrypt(argsv.register_name,key).decode(),
            encrypt(argsv.register_surname,key).decode(),
            argsv.register_username,
            encrypt(argsv.register_mail,key).decode(),
            encrypt(argsv.register_password,key).decode(),
            encrypt(token,key).decode(),
            key
        ))
        
        cursor.execute('''
            CREATE TABLE vault (
                code TEXT,
                site TEXT,
                url TEXT,
                username TEXT,
                password TEXT,
                category TEXT
            )
        ''')

        conn.commit()
        conn.close()

        conn = sqlite3.connect(users_db)
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO users (
                code,
                username,
                path
            )
            VALUES (?, ?, ?)
        ''', (
            code_user,
            argsv.register_surname,
            user_path
        ))
        
        conn.commit()
        conn.close()

        user_parser.add_section(argsv.register_username)
        user_parser.set(argsv.register_username, 'username', argsv.register_username)
        user_parser.set(argsv.register_username, 'last', 'never')
        user_parser.set(argsv.register_username, 'status', 'active')
        user_parser.set(argsv.register_username, 'left', '5')
        
        user_parser.write(open(user_ini, 'w'))
        
        print(True)
        
if __name__ == '__main__':
    Main()