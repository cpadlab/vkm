#        _                         
#   __ _| |___ __  
#   \ V / / / '  \  v6.0
#   \_/|_\_\_|_|_|
# 
# VKM v6.0
# Author: Carlos Padilla (cpadlab)
# Proyect: https://github.com/cpadlab/vkm

from fastapi import FastAPI, HTTPException, Depends, Request, Header
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from .funcs import FAFuncs
from ...core import config

app = FastAPI(
    title=config.VKM_TITLE,
    version=config.VKM_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[f"https://{config.HT_HOST}:{config.HT_PORT}"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

def getCookie(request: Request):return request.cookies.get("session")
def checkToken(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    
    from ..sqlite3 import SQLite3;sq = SQLite3()
    token = credentials.credentials

    if token != SQLite3.Sesion.getLastToken(sq)[0].decode():
        raise HTTPException(
            status_code=config.STATUS_CODES.get('Unauthorized'),
            detail="Invalid or outdated token."
        )
    
    return token

# 
@app.get("/")
async def root():return {"VKMv6": "Code by cpadlab"}

@app.get("/Z2V0VG9rZW4K")
async def func():return FAFuncs.getToken()

@app.get("/Y2hlY2tDb29raWUK")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.checkCookie(cookie=cookie)

@app.get("/Z2V0VXNlcm5hbWUK")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getUsername(cookie=cookie)

@app.get("/Z2V0VG90YWxLZXkK")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getTotalKeys(cookie=cookie)

@app.get("/Z2V0R3JvdXBzCg")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getGroups(cookie=cookie)

@app.get("/Z2V0RmF2b3JpdGVzS2V5cwo")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getFavoritesKeys(cookie=cookie)

@app.get("/Z2V0UGFzc3dvcmQK")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getPassword(cookie=cookie)

@app.get("/ZGVsZXRlVXNlcm5hbWUK")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.deleteAccount(cookie=cookie)

@app.get("/ZXhwb3J0S2V5cwo")
async def func(
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.exportKeys(cookie=cookie)

class Credentials(BaseModel):
    username:str
    password:str

@app.post("/cmVnaXN0ZXJVc2VybmFtZQo")
async def func(data: Credentials, token: str = Depends(checkToken)):
    return FAFuncs.registerUsername(username=data.username, password=data.password)

@app.post("/Y2hlY2tDcmVkZW50aWFscwo")
async def func(data: Credentials, token: str = Depends(checkToken)):
    return FAFuncs.loginUsername(username=data.username, password=data.password)

class DataGroup(BaseModel):
    groupname:str
    groupcolor:str

@app.post("/YWRkR3JvdXAK")
async def func(data: DataGroup, cookie: str = Depends(getCookie), token: str = Depends(checkToken)):
    return FAFuncs.addGroup(cookie=cookie, groupname=data.groupname, color=data.groupcolor)

class DataModifyGroup(BaseModel):
    old:str
    new:str
    color:str

@app.post("/bW9kaWZ5R3JvdXAK")
async def func(data: DataModifyGroup, cookie: str = Depends(getCookie), token: str = Depends(checkToken)):
    return FAFuncs.modifyGroup(cookie=cookie, old=data.old, new=data.new, color=data.color)

class DataGroup2(BaseModel):
    groupname:str

@app.post("/Z2V0Q29sb3JHcm91cAo")
async def func(
    data: DataGroup2,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getColorGroup(cookie=cookie, groupname=data.groupname)

@app.post("/ZGVsZXRlR3JvdXAK")
async def func(
    data: DataGroup2,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.deleteGroup(cookie=cookie, groupname=data.groupname)


@app.post("/Z2V0S2V5c0Zyb21Hcm91cAo")
async def func(
    data: DataGroup2,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getKeysGroup(cookie=cookie, groupname=data.groupname)

class DataKey(BaseModel):
    name:str
    link:str
    username:str
    password:str
    group:str
    favorite:bool

@app.post("/YWRkS2V5Cg")
async def func(
    data: DataKey,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.createKey(cookie=cookie, name=data.name, link=data.link, 
    username=data.username, password=data.password, group=data.group, favorite=data.favorite
)

class KeyCode(BaseModel):
    code:int

@app.post("/ZGVsZXRlS2V5Cg")
async def func(
    data: KeyCode,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.deleteKey(cookie=cookie, code=data.code)

@app.post("/Z2V0S2V5Cg")
async def func(
    data: KeyCode,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.getKey(cookie=cookie, code=data.code)

class modKey(BaseModel):
    code: int
    name:str
    link:str
    username:str
    password:str
    group:str
    favorite:bool

@app.post("/bW9kaWZ5S2V5Cg")
async def func(
    data: modKey,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.modifyKey(cookie=cookie, code=data.code, name=data.name, link=data.link, 
    username=data.username, password=data.password, group=data.group, favorite=data.favorite)

class SearchKey(BaseModel):
    search:str

@app.post("/Z2V0S2V5c1NlYXJjaAo")
async def func(
    data: SearchKey,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.searchKey(cookie=cookie, search=data.search)

class modifyPassword(BaseModel):
    password:str

@app.post("/bW9kaWZ5UGFzc3dvcmQK")
async def func(
    data: modifyPassword,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.modifyPassword(cookie=cookie, password=data.password)

class modifyUsername(BaseModel):
    username:str

@app.post("/bW9kaWZ5VXNlcm5hbWUK")
async def func(
    data: modifyUsername,
    token: str = Depends(checkToken),
    cookie: str = Depends(getCookie),
):return FAFuncs.modifyUsername(cookie=cookie, username=data.username)

def run():

    uvicorn.run(app, 
        host=config.FA_HOST,
        port=config.FA_PORT,
        ssl_keyfile=config.SSL_KEY_PATH,
        ssl_certfile=config.SSL_CERT_PATH,
        log_level=config.FA_LOG_LEVEL
    )
