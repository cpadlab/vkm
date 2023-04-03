import sys, os, configparser

class getArgvs:
    
    def __init__(self) -> None:
        
        self.register_name = sys.argv[1]
        self.register_surname = sys.argv[2]
        self.register_username = sys.argv[3]
        self.register_mail = sys.argv[4]
        self.register_password = sys.argv[5]
        self.register_rep_password = sys.argv[6]
        
class generateToken:
    
    def __init__(self, username) -> None:
        import hashlib, base64 
                
        username_md5 = hashlib.md5(username.encode()).digest()
        self.token = base64.b85encode(username_md5)
        
        parser = configparser.ConfigParser()
        parser.read('paths.ini')
        
        save_toke_path = parser.get('other','j_save_tokens') + f'/{username}.key'
        with open( save_toke_path, 'w') as save_token_file:
            save_token_file.write(self.token)

class Main:
    
    def __init__(self) -> None:
        
        parser = configparser.ConfigParser()
        parser.read('paths.ini')
        
        argsv = getArgvs()
        token = generateToken(argsv.register_name).token
        
        from cryptography.fernet import Fernet
        key = Fernet.generate_key()
        
        users_db = parser.get('general', 'users_db')
        user_ini = parser.get('general', 'user_ini')
        user_path = os.path.join(parser.get('other','j_user_path'), argsv.register_name)
        user_db = os.path.join(user_path, 'vault.sqlite3')
        
        user_parser = configparser.ConfigParser()
        user_parser.read(user_ini)
        code_user = int(user_parser.get('users', 'total')) + 1
        
        import sqlite3
        from functionalities.encrypt import encrypt
        
        conn = sqlite3.connect(user_db)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE info (
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
        
        cursor.execute(f'''
            INSERT INTO info (
                code,
                name,
                surname,
                username,
                mail,
                password,
                recovery_token
                key,
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)", (
                {code_user},
                {encrypt(key,argsv.register_name)},
                {encrypt(key,argsv.register_surname)},
                {encrypt(key,argsv.register_username)},
                {encrypt(key,argsv.register_mail)},
                {encrypt(key,argsv.register_password)},
                {encrypt(key,token)},
                {key}
            )
        ''')

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
        
        user_parser.add_section(code_user)
        user_parser.set(code_user, 'username', encrypt(key,argsv.register_username))
        user_parser.set(code_user, 'last', 'never',)
        user_parser.set(code_user, 'status', 'active')
        user_parser.set(code_user, 'login', False)
        user_parser.write()
        
        conn = sqlite3.connect(users_db)
        cursor = conn.cursor()
        
        cursor.execute(f'''
            INSERT INTO users (
                code,
                username,
                path,
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)", (
                {code_user},
                {encrypt(key,argsv.register_surname)},
                {user_path}
            )
        ''')
        
        conn.commit()
        conn.close()
        
        print(True)
        
if __name__ == '__main__':
    Main()