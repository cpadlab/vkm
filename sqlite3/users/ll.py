import sqlite3

# Conectar a la base de datos
conn = sqlite3.connect('users.sqlite3')

# Obtener cursor
cursor = conn.cursor()

# Ejecutar consulta para obtener el nombre de las tablas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

# Obtener resultado
tablas = cursor.fetchall()

# Mostrar el nombre de las tablas
for tabla in tablas:
    print(tabla[0])


# Obtener todas las filas de la tabla users
cursor.execute("SELECT * FROM users;")
filas = cursor.fetchall()

# Mostrar las filas por pantalla
for fila in filas:
    print(fila)

# Cerrar cursor y conexión
cursor.close()
conn.close()
