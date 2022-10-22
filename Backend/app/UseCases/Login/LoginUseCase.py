from Repositories.Login.LoginRepository import LoginRepository
from Repositories.Login.LoginCorporateRepository import LoginCorporateRepository
from Services.Login.LoginService import LoginService
from Services.Login.LoginCorporateService import LoginCorporateService
from Models.Login.LoginModel import LoginModel
from Models import RequestCommonModel

class LoginUseCase: 
    def login(corporate_unique_name:str, user_name:str, password:str) -> LoginModel:
        corporateService = LoginCorporateService(LoginCorporateRepository())
        corporate = corporateService.get_corporate_info(corporate_unique_name)
        if corporate is None:
            return None

        loginService = LoginService(LoginRepository(corporate.corporate_id))
        corporate_user = loginService.get_corporate_user(user_name, password)
        if corporate_user is None:
            return None
        return LoginModel(corporate, corporate_user)

    def is_valid_corporate_user_info(corporate_id:int, corporate_unique_name:str, user_id:int, user_name:str) -> bool:
        corporateService = LoginCorporateService(LoginCorporateRepository())
        if not corporateService.get_valid_corporate_info(corporate_id, corporate_unique_name):
            return False
        
        loginService = LoginService(LoginRepository(corporate_id))
        if not loginService.get_valid_corporate_user(user_id, user_name):
            return False

        return True