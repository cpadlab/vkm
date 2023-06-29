# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
#          (code by wual)

# VKM V5.0.6 | 2023 Summer Review 1
# Page >> https://14wual.github.io/vkm
# Code >> https://github.com/14wual/VKM
# Follow me >> https://twitter.com/14wual

import argparse
import webbrowser
import http.server
import socketserver
import signal
import threading
import sys, os
import subprocess

from modules.Exceptions import ArgsError
from modules.vkm_fastapi import start_fastapi_server

global httpd

class VKMHandler:

    def __init__(self, sig, frame) -> None:

        print("Logging out... Closing server... Please, wait 10 seconds.")

        thread = threading.Thread(target=VKMHandler.signal_handler(sig, frame))
        thread.daemon = True;thread.start();thread.join(10)

        if thread.is_alive():
            try:sys.exit()
            except:
                try:raise SystemExit
                except:os._exit(0)
            finally:quit()
    
    def signal_handler(sig, frame):
        VKMHandler.break_server()

    @staticmethod
    def break_server():
        try:
            httpd.shutdown()
            httpd.server_close()
            sys.exit()
        except:
            try:sys.exit()
            except:
                try:raise SystemExit
                except:os._exit(0)
            finally:quit()

class VKMServer:

    class VKMController(http.server.SimpleHTTPRequestHandler):
        def do_GET(self):
            
            if self.path.endswith('.php'):
                self.send_php_response(os.path.abspath(os.path.join(os.getcwd(), self.path)))
            else:
                super().do_GET()

        def do_POST(self):
            if self.path.endswith('.php'):
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                self.send_php_response(os.path.abspath(os.path.join(os.getcwd(), self.path)), post_data)
            else:
                super().do_POST()

        def end_headers(self):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            super().end_headers()

        def send_php_response(self, path, post_data=None):
            relative_path = path[1:] 
            php_cmd = ['php', '-r', f'$post_data = file_get_contents("php://input"); $_POST = json_decode($post_data, true); include("{relative_path}");']
            
            if post_data:php_cmd.insert(2, f'$post_data = {post_data.decode("utf-8")};')
            
            process = subprocess.Popen(php_cmd, stdout=subprocess.PIPE, cwd=os.getcwd())
            output, _ = process.communicate()
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(output)

    def open_vkm(host="127.0.0.1",
            port="1014",
            start="",
            username=""
        ):

        if start != "":
            if start == "login":webbrowser.open(f"http://{host}:{port}/{start}/?u={username}", new=2)
            elif start == "register":webbrowser.open(f"http://{host}:{port}/{start}", new=2)
            else:webbrowser.open(f"http://{host}:{port}/{start}", new=2)
        elif username != "":webbrowser.open(f"http://{host}:{port}/?u={username}", new=2)
        else:webbrowser.open(f"http://{host}:{port}/", new=2)  

    def run_http_server():httpd.serve_forever()

    def __init__(self, 
            host="127.0.0.1",
            port="1014",
            start="",
            username=""
        ) -> None:

        global httpd

        web_handler = VKMServer.VKMController
        httpd = socketserver.TCPServer((host, port), web_handler)

        http_server_thread = threading.Thread(target=VKMServer.run_http_server)
        fastapi_server_thread = threading.Thread(target=start_fastapi_server, args=(host, port))

        http_server_thread.start()
        fastapi_server_thread.start()
    
        VKMServer.open_vkm(host=host, port=port, start=start, username=username)

        signal.signal(signal.SIGINT, VKMHandler)
        
        httpd.serve_forever()

class VKMApp:

    def __init__(self) -> None:

        host = "127.0.0.1"
    
        parser = argparse.ArgumentParser()
        parser.add_argument('-u', '--username', dest="username", help="Go Login")
        parser.add_argument('-p', '--port', type=int, dest="port", help='Select VKM boot port')
        parser.add_argument('-R', '--register', dest="register",  action="store_true", help='Go Register')

        username, port, start = VKMApp.check_args(parser.parse_args())

        VKMServer(host=host, port=port, start=start, username=username)
        
    def check_args(args):

        port=1014;username="";start=""

        if args.username:
            username=str(args.username)
            start = "login"
        if args.port:port=int(args.port)
        if args.register:
            if args.username:raise ArgsError("Er: Cannot use -u and -R options at the same time.")
            else:start = "register"
            
        return username, port, start

if __name__ == '__main__':
    VKMApp()