from Repositories.Login.ILoginRepository import ILoginRepository

class LoginService:
    def __init__(self, repository:ILoginRepository):
        self.repository = repository

    def get_corporate_user(self, user_name:str, password:str):
        return self.repository.get_corporate_user_info(user_name, password)

    def get_valid_corporate_user(self, user_id:int, user_name:str) -> bool:
        return self.repository.get_valid_corporate_user(user_id, user_name)