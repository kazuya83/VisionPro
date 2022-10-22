from Models.Master.MasterModel import MasterModel
from Repositories.Master.MasterRepository import MasterRepository
from Services.Master.MasterService import MasterService

class MasterUseCase:
    def get_master_list(corporate_id:int) -> list[MasterModel]:
        service = MasterService(MasterRepository(corporate_id))
        return service.get_master_list()

    def add_master(corporate_id:int, master_name:str, description:str) -> str:
        service = MasterService(MasterRepository(corporate_id))
        service.add_master(master_name, description)
        

    def get_master_data_list(corporate_id:int, master_id:int):
        service = MasterService(MasterRepository(corporate_id))
        return service.get_master_data_list(master_id)

    def add_master_data(corporate_id:int, master_id:int, master_data_value:str):
        service = MasterService(MasterRepository(corporate_id))
        service.add_master_data(master_id, master_data_value)