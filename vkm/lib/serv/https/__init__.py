#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

from ...core import config 
from http.server import SimpleHTTPRequestHandler
import socketserver, ssl, sys

class _ServerHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=config.LISTING_PATH, **kwargs)
        
class Https:

    def __init__(self):
        
        handler = _ServerHandler

        try:self.httpd = socketserver.TCPServer(config.SERVER_ADDRESS, handler)
        except OSError as error:
            print(f"Error: Port {config.HT_PORT} is in use.\
            \n  Try again in a few minutes.");sys.exit(0)

        self.ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        self.ssl_context.load_cert_chain(certfile=str(config.SSL_CERT_PATH), keyfile=str(config.SSL_KEY_PATH))

    def run(self):
        try:
            with self.httpd:
                self.httpd.socket = self.ssl_context.wrap_socket(self.httpd.socket, server_side=config.SERVER_SIDE)

                print(f"Vault: https://{config.HT_HOST}:{config.HT_PORT}/\n"
                f"{'='*config.SEPARATOR}\n"
                f"Output:\n")

                self.httpd.serve_forever()        
        except KeyboardInterrupt:self.shutdownServ()            
        except Exception as error:pass