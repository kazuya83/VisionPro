from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse


from Models.Navigation.navigation_model import Navigation

router = APIRouter()


@router.get('/Navigation')
def navigation():
    navigation_list = []
    navigation_list.append(Navigation(1, 'aaa'))
    navigation_list.append(Navigation(2, 'bbb'))
    navigation_list.append(Navigation(3, 'ccc'))
    navigation_list.append(Navigation(4, 'ddd'))
    navigation_list.append(Navigation(5, 'eee'))
    json_compatible_data = jsonable_encoder(navigation_list)
    return JSONResponse(content=json_compatible_data)