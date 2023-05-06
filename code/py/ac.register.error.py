import sys
from datetime import datetime

class Main:
    
    def __init__(self) -> None:
        
        error = sys.argv[1]
        log_error_file = f'../about/log/error.log'
        now = datetime.now()
        strdate = now.strftime('%Y-%m-%d %H:%M:%S')
        with open(log_error_file, 'r+') as file:
            file.seek(0, 2)
            file.write('\n'+ f'[{strdate}] ' + error)

if __name__ == '__main__':
    Main()