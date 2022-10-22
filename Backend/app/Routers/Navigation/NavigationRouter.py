from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from Models.RequestCommonModel import RequestCommonModel
from UseCases.Login.LoginUseCase import LoginUseCase
from UseCases.Navigation.NavigationUseCase import NavigationUseCase
from Models.ResponseModel import ResponseModel, Status


from Models.Navigation.NavigationModel import NavigationModel

router = APIRouter()

@router.post('/Navigation')
def navigation(request:RequestCommonModel):
    is_valid = LoginUseCase.is_valid_corporate_user_info(request.corporate_id, request.corporate_unique_name, request.user_id, request.user_name)
    if not is_valid:
        return convert_response(ResponseModel(Status.BAD_REQUEST, 'リクエストに問題があります。'))

    navigation_list = NavigationUseCase.get_navigation_list(request.corporate_id)
    return convert_response(ResponseModel(Status.OK, '正常にNavigation情報が取得できました', navigation_list))


def convert_response(response:ResponseModel):
    json_compatible_data = jsonable_encoder(response)
    return JSONResponse(content=json_compatible_data)