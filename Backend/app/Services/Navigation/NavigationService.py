from Models.Navigation.NavigationModel import NavigationModel
from Repositories.Navigation.INavigationRepository import INavigationRepository

class NavigationService:
    def __init__(self, repository:INavigationRepository):
        self.repository = repository

    def get_navigation_list(self) -> list[NavigationModel]:
        return self.repository.get_navigation_list()