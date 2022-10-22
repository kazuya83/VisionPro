from Models.CorporateModel import CorporateModel
from Models.CorporateUserModel import CorporateUserModel

class LoginModel:
    def __init__(self, corporate:CorporateModel, corporate_user:CorporateUserModel):
        self.corporate = corporate
        self.corporate_user = corporate_user