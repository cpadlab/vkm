import sqlite3, os

# Conectar a la base de datos
ddbb = os.path.join("C:/xampp/htdocs/vkm/database/users", "root", "database.db")
conn = sqlite3.connect(ddbb)

# Crear el cursor
cursor = conn.cursor()

# Ejecutar la consulta
cursor.execute("SELECT * FROM keys")

# Obtener los resultados
results = cursor.fetchall()#('usuario1', 'password1', 'sitio1', 'none', 'default')

# Cerrar la conexión a la base de datos
conn.close()

# Imprimir los resultados
for row in results:
    print(row)
