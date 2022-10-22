import abc
from Models.Master.MasterModel import MasterModel
from Models.Master.MasterDataModel import MasterDataModel

class IMasterRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def get_master_list(self) -> list[MasterModel]:
        raise NotImplementedError()

    def add_master(self, master_name:str, description:str) -> None:
        raise NotImplementedError()

    def get_master_data_list(self, master_id:int) -> list[MasterDataModel]:
        raise NotImplementedError()

    def add_master_data(self, master_id:int, master_data_value:str) -> None:
        raise NotImplementedError()