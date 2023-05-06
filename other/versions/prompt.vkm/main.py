import cmd, sys, sqlite3, getpass, os, inquirer, pyperclip,argparse
from cryptography.fernet import Fernet

class VKM(cmd.Cmd):
    prompt = 'vkm.none > '

    def __init__(self, completekey='tab', stdin=sys.stdin, stdout=sys.stdout):
        super().__init__(completekey=completekey, stdin=stdin, stdout=stdout)

        self.LOGIN = False

    def do_l(self, args):

        parser = argparse.ArgumentParser()
        
        parser.add_argument('--username', dest='user')
        parser.add_argument('-u', dest='user')
        
        try:args = parser.parse_args(args.split())
        except:pass

        try:os.system("cls")
        except:os.system("clear")

        if not args.user:
            print("\Login | NONE\n")
            username = input("Username: ")
        else:
            username = args.user
            print(f"\nLOGIN | User: {username.upper()}\n")

        
        conn = sqlite3.connect('db/database.db')
#user existe
        password = getpass.getpass(prompt='Password: ')

    def do_r(self, args):
        "Register a new user.\nUsage = 'r' | 'r' + argvs\n    argvs > username"
        self.do_register(args)
    def do_register(self, args):
        "Register a new user.\nUsage = 'register' | 'register' + argvs\n    argvs > username"

        parser = argparse.ArgumentParser()
        
        parser.add_argument('--username', dest='user')
        parser.add_argument('-u', dest='user')
        
        try:args = parser.parse_args(args.split())
        except:pass

        try:os.system("cls")
        except:os.system("clear")

        if not args.user:
            print("\nREGISTER | NEW USER\n")
            username = input("Username: ")
        else:
            username = args.user
            print(f"\nREGISTER | User: {username.upper()}\n")
        password = getpass.getpass(prompt='Password: ')
        rpassword = getpass.getpass(prompt='Repeat password: ')

        if password == rpassword:
            conn = sqlite3.connect('db/database.db')
            result = conn.execute(f"SELECT * FROM users WHERE user = '{username.lower()}'").fetchone()
            if result:
                print(f"[ ✗ ] The user {username} already exists.")
            else:

                info_str = f"Register New User {username} | Summary"
                count_info_str = ''
                count_password = ''
                for char in info_str:count_info_str += '-'
                for char in password:count_password += '*'

                print(f"""
{info_str}
{count_info_str}
Username: {username}
Password: {count_password}
""")

                questions = [
                    inquirer.Confirm('confirm', message='The data is correct? '),
                ]

                answers = inquirer.prompt(questions)
                if answers['confirm']:
                    recovery = Fernet.generate_key()
                    key = Fernet.generate_key()
                    
                    info2_str = "IMPORTANT! | SAVE this key to a FILE"
                    count_info2_str = ''
                    for char in info2_str:count_info2_str += '-'

                    print(f"""
{info2_str}
{count_info2_str}
    Recovery Key: {recovery}
                    """)

                    questions = [
                        inquirer.Confirm('confirm', message='Copy to clipboard? '),
                    ]

                    answers = inquirer.prompt(questions)
                    if answers['confirm']:
                        pyperclip.copy(str(recovery))
                        print("Copied Successfully.")
                    else:pass
                    
                    cursor = conn.cursor()
                    cursor.execute("SELECT COUNT(*) FROM users")
                    code = int(cursor.fetchone()[0]) + 1

                    fernet = Fernet(key)

                    query = "INSERT INTO users (code, user, password, recovery, key) VALUES (?, ?, ?, ?, ?)"
                    data = (code, username, fernet.encrypt(password.encode()), fernet.encrypt(recovery), key)
                    conn.execute(query, data);conn.commit();conn.close()
                    print("[ ✓ ] User successfully registered.")

                else:
                    try:os.system("cls")
                    except:os.system("clear")
                    self.do_register(args)
        
        else:print("[ ✗ ] Passwords must be the same")

    def do_hello(self, args):print('Hello,', args)

    def do_cls(self, args):
        try:os.system("cls")
        except:os.system("clear")

    def do_clear(self, args):
        try:os.system("clear")
        except:os.system("cls")

    def do_exit(self, args):return True

if __name__ == '__main__':
    VKM().cmdloop()
