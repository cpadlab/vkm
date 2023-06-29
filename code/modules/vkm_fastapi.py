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

from fastapi import FastAPI
import uvicorn, json
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class VKMFastApi:

    def __init__(self, host, getport) -> None:
        self.host = host
        self.port = getport + 1

        global origins
        origins = [f"http://127.0.0.1:{getport}", f"http://localhost:{getport}",]

    def run(self):
        app.add_middleware(CORSMiddleware,allow_origins=origins,allow_credentials=True,allow_methods=["*"],allow_headers=["*"],)
        uvicorn.run(app, host=self.host, port=self.port)

# ----------MAIN----------

@app.get("/")
def read_root():return {"VKM V5": "Code by Wual"}

# ----------COMMON-BASEMODEL----------

class BM_Credentials(BaseModel):
    user: str; pswd: str

class BM_GroupData(BaseModel):
    user: str; pswd: str; groupname: str

class FindKeyE(BaseModel):
    pswd: str; user: str; code: str

# ----------MODULES/COMMON----------

@app.post("/check_group_exists")
def register_group(post_data: BM_GroupData):
    from modules.common.check_group import FA_CheckExistsGroup
    return json.dumps(FA_CheckExistsGroup.check_exists(password=post_data.pswd,username=post_data.user,groupname=post_data.groupname))

@app.get("/choose_username")
def choose_username():
    from modules.common.choose_username import FA_ChooseUser
    return FA_ChooseUser.get_random_line()

@app.get("/generate_password")
def generate_password():
    from modules.common.generate_password import FA_GeneratePassword
    return FA_GeneratePassword.get_random_password()

# ----------MODULES/PAGES/VAULT----------

@app.post("/get_groups")
def get_groups(post_data: BM_Credentials):
    from modules.pages.vault.get_groups import FA_GetGroups
    return json.dumps(FA_GetGroups.get_groups(password=post_data.pswd,username=post_data.user))

@app.post("/total_keys")
def total_keys(post_data: BM_Credentials):
    from modules.pages.vault.count_keys import FA_CountKeys
    return json.dumps(FA_CountKeys.count_keys(password=post_data.pswd,username=post_data.user))

@app.post("/get_keys")
def get_keys(post_data: BM_Credentials):
    from modules.pages.vault.get_keys import FA_GetKeys
    return json.dumps(FA_GetKeys.get_keys(password=post_data.pswd,username=post_data.user))

# ----------MODULES/PAGES/LOGIN----------

@app.post("/check_login")
def check_login(post_data: BM_Credentials):
    from modules.pages.login.check_login import FA_CheckLogin
    return json.dumps(FA_CheckLogin.check_access(password=post_data.pswd,username=post_data.user))

# ----------MODULES/PAGES/REGISTER----------

@app.post("/register_username")
def register_username(post_data: BM_Credentials):
    from modules.pages.register.register_user import FA_RegisterUsername
    return json.dumps(FA_RegisterUsername.create_kdbx_file(password=post_data.pswd,username=post_data.user))

# ----------MODULES/PAGES/CREATE----------

class RegisterKeyData(BaseModel):
    user: str; pswd: str; inputTitle: str; inputURL: str
    inputUsername: str; inputPassword: str; selectGroup: str

@app.post("/register_key")
def register_key(post_data: RegisterKeyData):
    from modules.pages.create.register_k import FA_RegisterKey
    return json.dumps(FA_RegisterKey.add_key_tovault(
        password=post_data.pswd, username=post_data.user,inputTitle=post_data.inputTitle, inputURL=post_data.inputURL,
        selectGroup=post_data.selectGroup, inputUsername=post_data.inputUsername, inputPassword=post_data.inputPassword)
    )

@app.post("/register_group")
def register_group(post_data: BM_GroupData):
    from modules.pages.create.register_g import FA_CreateGroup
    return json.dumps(FA_CreateGroup.create_group(password=post_data.pswd,username=post_data.user,namegroup=post_data.groupname))

# ----------MODULES/PAGES/EDIT----------

@app.post("/delete_group")
def delete_group(post_data: BM_GroupData):
    from modules.pages.edit.delete_g import FA_DeleteGroup
    return json.dumps(FA_DeleteGroup.delete_grp(password=post_data.pswd,username=post_data.user,groupname=post_data.groupname))

class ModifyGroup(BaseModel):
    user: str; pswd: str ;groupname: str ;newname:str

@app.post("/rename_group")
def rename_group(post_data: ModifyGroup):
    from modules.pages.edit.rename_g import FA_RenameGroup
    return json.dumps(FA_RenameGroup.rename_grp(password=post_data.pswd,username=post_data.user,groupname=post_data.groupname, newname=post_data.newname))

@app.post("/delete_key")
def delete_group(post_data: FindKeyE):
    from modules.pages.edit.delete_k import FA_DeleteKey
    return json.dumps(FA_DeleteKey.delete_grp(password=post_data.pswd,username=post_data.user,code=post_data.code))

class BM_EditKey(BaseModel):
    user: str; pswd: str; inputTitle: str; inputURL: str
    inputUsername: str; inputPassword: str; selectGroup: str
    code: str

@app.post("/edit_key")
def register_key(post_data: BM_EditKey):
    from modules.pages.edit.edit_k import FA_EditKey
    return json.dumps(FA_EditKey.add_key_tovault(
        password=post_data.pswd, username=post_data.user,inputTitle=post_data.inputTitle, inputURL=post_data.inputURL,
        selectGroup=post_data.selectGroup, inputUsername=post_data.inputUsername, inputPassword=post_data.inputPassword,
        code=post_data.code)
    )

# ----------MODULES/PAGES/GENERATE(PASSWORD)----------

class PassGen(BaseModel):
    lengh: str; types: str

@app.post("/generate_password2")
def generate_password2(post_data: PassGen):
    from modules.pages.generate.generate_k import FA_GenerateCustomPassword
    return FA_GenerateCustomPassword.get_random_password(lengh=post_data.lengh, types=post_data.types)

# ----------MODULES/PAGES/SEARCH----------

class BM_SearchKey(BaseModel):
    pswd: str; user: str; search: str

@app.post("/search")
def find_entry(post_data: BM_SearchKey):
    from modules.pages.search.search_key import FA_SearchKey
    return json.dumps(FA_SearchKey.find_key(password=post_data.pswd,username=post_data.user,search=post_data.search))

# ----------MODULES/PAGES/SHOW----------

@app.post("/find_entry")
def find_entry(post_data: FindKeyE):
    from modules.pages.show.search_k import FA_FindKey
    return json.dumps(FA_FindKey.find_key(password=post_data.pswd,username=post_data.user,code=post_data.code))

@app.post("/get_group_entry")
def find_entry(post_data: BM_GroupData):
    from modules.pages.show.search_gk import FA_GetGKeys
    return json.dumps(FA_GetGKeys.get_group_keys(password=post_data.pswd,username=post_data.user,groupname=post_data.groupname))

def start_fastapi_server(host, port):VKMFastApi(host=host, getport=port).run()