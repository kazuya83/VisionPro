from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from UseCases.Login.LoginUseCase import LoginUseCase
from Models.ResponseModel import ResponseModel, Status

router = APIRouter()

class LoginForm(BaseModel):
    corporate_unique_name:str
    user_name:str
    password:str

@router.post('/Login')
def login(login_form:LoginForm):
    response = ResponseModel(Status.OK, 'ログイン成功')
    try:
        corporate_unique_name = login_form.corporate_unique_name
        user_name = login_form.user_name
        password = login_form.password
    except Exception as e:
        response.status_code = Status.BAD_REQUEST
        response.message = '入力内容に不足があります。'
        return response
    
    login_info = LoginUseCase.login(corporate_unique_name, user_name, password)
    if login_info is None:
        response.status_code = Status.OK
        response.message = 'ログイン情報に誤りがあります。'
        return response
    response.data = login_info
    json_compatible_data = jsonable_encoder(response)
    return JSONResponse(content=json_compatible_data)