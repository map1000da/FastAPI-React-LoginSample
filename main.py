from typing import Union

import uvicorn
import jwt
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

SECRET_KEY = "caircoders111"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

dummy_user = {
    "username": "caircoders",
    "password": "12345endal",
}

app = FastAPI()

# CORSを回避するために追加(よく分かっていない)
# 多分3000のサーバーからのアクセスを許可する的な
app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"]
)

class LoginClass(BaseModel):
    username: str
    password: str

@app.get("/")
def read_root():
    return {"Message": "Hello "}

@app.post("/login")
async def login_user(login_item: LoginClass):
    data = jsonable_encoder(login_item)
    if dummy_user["username"] == data["username"] and dummy_user["password"] == data["password"]:
        encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}
    else:
        return {"message": "login failed"}
    
def main():
    uvicorn.run("project_name.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()