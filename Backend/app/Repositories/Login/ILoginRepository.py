import abc
from Models.CorporateUserModel import CorporateUserModel

class ILoginRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def get_corporate_user_info(self, user_name:str, password:str) -> CorporateUserModel:
        raise NotImplementedError()

    @abc.abstractmethod
    def get_valid_corporate_user(self, user_id:int, user_name:str) -> bool:
        raise NotImplementedError()