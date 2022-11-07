from Repositories.navigation_list_repository import NavigationListRepository

class NavigationListUseCase:
    def get_navigation_list() -> dict:
        return NavigationListRepository.get_navigation_list()

    def update_navigation_is_deleted(navigation_id:int, is_deleted:str) -> bool:
        return NavigationListRepository.update_navigation_is_deleted(navigation_id, is_deleted)

    def get_corporate_navigaiton_list(corporate_id) -> dict:
        return NavigationListRepository.get_corporate_navigation_list(corporate_id)
    
    def update_corporate_navigation_is_deleted(corporate_id:int, navigation_id:int, is_deleted:str) -> bool:
        return NavigationListRepository.update_corporate_navigation_is_deleted(corporate_id, navigation_id, is_deleted)