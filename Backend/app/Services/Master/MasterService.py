from doctest import master
from Repositories.Master.IMasterRepository import IMasterRepository

class MasterService:
    def __init__(self, repository:IMasterRepository):
        self.repository = repository

    def get_master_list(self):
        return self.repository.get_master_list()

    def add_master(self, master_name:str, description:str) -> None:
        self.repository.add_master(master_name, description)

    def get_master_data_list(self, master_id:int):
        return self.repository.get_master_data_list(master_id)

    def add_master_data(self, master_id:int, master_data_value:str) -> None:
        self.repository.add_master_data(master_id, master_data_value)