from Models.Navigation.NavigationModel import NavigationModel
from Repositories.Navigation.NavigationRepository import NavigationRepository
from Services.Navigation.NavigationService import NavigationService

class NavigationUseCase:
    def get_navigation_list(corporate_id:int) -> list[NavigationRepository]:
        service = NavigationService(NavigationRepository(corporate_id))
        return service.get_navigation_list()