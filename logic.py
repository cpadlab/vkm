
required = True
not_required = None

class Register:
    
    inputs = {
        'Name': required,
        'Surname':  not_required,
        'username': required,
        'mail': required,
        'password': required,
        'repeat-password': required
    }
    
    other = {
        'use_contract': required
    }
    
    process = {
        f'Take {inputs}',
        f'Create a private password (token) with {inputs["username"]}',
        'Register on users ddbb /sqlite3/users/users.sqlite3' > {'username', 'path' > '/sqlite3/users/$username/'},
        'Register on users ini file /about/users/users.ini' > {'Code User', 'username' > '$username', 'status' > 'active', 'last' > 'never', 'login' > False},
        'Create the user path' > '/sqlite3/users/$username/',
        'Create the personal user ddbb ' > '/sqlite3/users/$username/vault.sqlite3',
        'Create a 512bit token, to recovery account'
        'Create the table user info ' > 'name', 'surname', 'username', 'mail', 'password', 'recovery-token'
        'Create the table user vault ' > 'site', 'url', 'username', 'password', 'category',
        'If ALL True, Skip Warning Alert' > 'Download the recovery-token file [.key]',
        'FINISH',
        'Redirects to' > 'setup-user.html',
    }


"""
setup de la ddbb de users.squilet:

import sqlite3
conn = sqlite3.connect('users.sqlite3')
cursor = conn.cursor()
cursor.execute('''
            CREATE TABLE users (
                code INTEGER,
                username TEXT,
                path TEXT
            )
        ''')
conn.commit()
conn.close()
"""