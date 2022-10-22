from Repositories.Login.ILoginCorporateRepository import ILoginCorporateRepository
from Models.CorporateModel import CorporateModel

class LoginCorporateService:
    def __init__(self, repository:ILoginCorporateRepository):
        self.repository = repository

    def get_corporate_info(self, corporate_unique_name:str) -> CorporateModel:
        return self.repository.get_corporate_info(corporate_unique_name)

    def get_valid_corporate_info(self, corporate_id:int, corporate_unique_name:str) -> bool:
        return self.repository.get_valid_corporate_info(corporate_id, corporate_unique_name)