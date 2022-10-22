import abc
from Models.CorporateModel import CorporateModel

class ILoginCorporateRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def get_corporate_info(self, corporate_unique_name:str) -> CorporateModel:
        raise NotImplementedError()

    @abc.abstractmethod
    def get_valid_corporate_info(self, corporate_id:int, corporate_unique_name:str) -> bool:
        raise NotImplementedError()