import sqlite3
import random

# Conectarse a la base de datos
conn = sqlite3.connect('nombre_de_tu_base_de_datos.db')
c = conn.cursor()

# Lista de posibles valores para cada columna
codigos = ['1', '2', '3']
sitios = ['Google', 'Facebook', 'Twitter']
urls = ['https://www.google.com', 'https://www.facebook.com', 'https://www.twitter.com']
usuarios = ['user1', 'user2', 'user3']
contrasenas = ['password1', 'password2', 'password3']
categorias = ['webs', 'shopping', 'webs']

# Generar tres filas aleatorias
for i in range(3):
    codigo = random.choice(codigos)
    sitio = random.choice(sitios)
    url = random.choice(urls)
    usuario = random.choice(usuarios)
    contrasena = random.choice(contrasenas)
    categoria = random.choice(categorias)

    # Insertar la nueva fila en la tabla
    c.execute("INSERT INTO vault (code, site, url, username, password, category) VALUES (?, ?, ?, ?, ?, ?)",
              (codigo, sitio, url, usuario, contrasena, categoria))

# Guardar los cambios y cerrar la conexión
conn.commit()
conn.close()
