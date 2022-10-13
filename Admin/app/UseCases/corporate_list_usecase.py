from Repositories.corporate_list_repository import CorporateListRepository

class CorporateListUseCase:
    def get_corporate_list() -> dict:
        return CorporateListRepository.get_corporate_list()