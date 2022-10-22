from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from UseCases.Login.LoginUseCase import LoginUseCase
from UseCases.AttributeVariable.AttributeVariableUseCase import AttributeVariableUseCase
from Models.RequestCommonModel import RequestCommonModel
from Models.ResponseModel import ResponseModel, Status
from Models.AttributeVariable.AttributeVariableModel import AttributeVariableModel, AttributeVariableDataType
import pprint

router = APIRouter()

class AttributeVariableRequest(RequestCommonModel):
    attribute_name:str = ''
    attribute_description:str = ''
    attribute_data_type:AttributeVariableDataType = AttributeVariableDataType.STRING
    master_id:int = 0

@router.post('/get_attribute_variable_list')
def get_attribute_variable_list(request:RequestCommonModel):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))
    
    attribute_variable_list = AttributeVariableUseCase.get_attribute_variable_list(request.corporate_id)
    return convert_response(ResponseModel(Status.OK, '正常に属性情報を取得できました。', attribute_variable_list))

@router.post('/add_attribute_variable')
def add_attribute_variable(request:AttributeVariableRequest):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))

    print(request)
    try:
        AttributeVariableUseCase.add_attribute_variable(request.corporate_id, request.attribute_name, request.attribute_description, request.attribute_data_type, request.master_id)
    except Exception as e:
        return convert_response(ResponseModel(Status.BAD_REQUEST, '指定された属性は既に登録されています。'))
    return convert_response(ResponseModel(Status.OK, '登録が完了しました'))
    

def convert_response(response:ResponseModel):
    json_compatible_data = jsonable_encoder(response)
    return JSONResponse(content=json_compatible_data)