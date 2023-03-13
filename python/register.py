# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     (code by wual)
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝

# See proyect >> https://github.com/14wual/VKM2Login
# Follow me >> https://twitter.com/codewual

import sys, csv, sqlite3, os

class Main:
    
    def __init__(self) -> None:
        
        username = sys.argv[1]
        password = sys.argv[2]
        email = sys.argv[3]
        #with open(f'{username}.txt', 'w') as w:
        #    w.write(f"{username}, {password}")
         
        if Main.register(username, password, email) == True:print("True")
        else:print("False")

    def register(username, password, email):
        
        
        with open('C:/xampp/htdocs/vkm/database/users.csv', 'r', newline='') as f:

            reader = csv.reader(f)
            rows = list(reader)
            last_row = rows[-1]
            new_row = [email, username, password, f'databases/users/{username}/vault.db']
            rows.append(new_row)
    
        with open('C:/xampp/htdocs/vkm/database/users.csv', 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(rows)
            
        path = os.path.join("C:/xampp/htdocs/vkm/database/users", username)
        os.mkdir(path)
            
        path = os.path.join("C:/xampp/htdocs/vkm/database/users", username, "database.db")
        conexion = sqlite3.connect(path)
        cursor = conexion.cursor()
        cursor.execute('''CREATE TABLE keys
                            (user text, password text, site text)''')

        cursor.execute("INSERT INTO keys VALUES ('usuario1', 'password1', 'sitio1')")
        cursor.execute("INSERT INTO keys VALUES ('usuario2', 'password2', 'sitio2')")
        conexion.commit()
        conexion.close()

        
        return True

if __name__ == '__main__':
    Main()