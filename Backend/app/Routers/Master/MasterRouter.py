from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from Models.RequestCommonModel import RequestCommonModel
from UseCases.Login.LoginUseCase import LoginUseCase
from Models.ResponseModel import ResponseModel, Status
from UseCases.Master.MasterUseCase import MasterUseCase
import pprint

router = APIRouter()

class MasterRequest(RequestCommonModel):
    master_id:int = 0
    master_name:str = ''
    descripton:str = ''

class MasterDataRequest(RequestCommonModel):
    master_id:int = 0
    master_data_value:str = ''

class MasterDataListRequest(RequestCommonModel):
    master_id:int = 0

@router.post('/get_master_list')
def get_master_list(request:RequestCommonModel):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))

    master_list = MasterUseCase.get_master_list(request.corporate_id)
    return convert_response(ResponseModel(Status.OK, '正常にMaster情報が取得できました。', master_list))

@router.post('/add_master')
def add_master(request:MasterRequest):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))
    
    try:
        MasterUseCase.add_master(request.corporate_id, request.master_name, request.descripton)
    except Exception:
        return convert_response(ResponseModel(Status.BAD_REQUEST, '指定されたマスタ名は既に登録されています。'))
    return convert_response(ResponseModel(Status.OK, '登録が完了しました'))
    

@router.post('/get_master_data_list')
def get_master_data_list(request:MasterDataListRequest):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))
        
    master_data_list = MasterUseCase.get_master_data_list(request.corporate_id, request.master_id)
    return convert_response(ResponseModel(Status.OK, '正常にMaster情報が取得できました。', master_data_list))

@router.post('/add_master_data')
def add_master_data(request:MasterDataRequest):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))
    try:
        MasterUseCase.add_master_data(request.corporate_id, request.master_id, request.master_data_value)
    except Exception:
        return convert_response(ResponseModel(Status.BAD_REQUEST, '指定されたマスタ値は既に登録されています。'))
    return convert_response(ResponseModel(Status.OK, '登録が完了しました'))
    

def convert_response(response:ResponseModel):
    json_compatible_data = jsonable_encoder(response)
    return JSONResponse(content=json_compatible_data)