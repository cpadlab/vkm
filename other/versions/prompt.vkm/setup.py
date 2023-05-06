import sqlite3, os

conn = sqlite3.connect('db/database.db')

conn.execute('''CREATE TABLE users
             (code INT PRIMARY KEY     NOT NULL,
             user           TEXT    NOT NULL,
             password       TEXT    NOT NULL,
             recovery       TEXT,
             key            TEXT);''')

conn.close()
