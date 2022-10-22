import abc
from Models.Navigation.NavigationModel import NavigationModel

class INavigationRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def get_navigation_list(self) -> list[NavigationModel]:
        raise NotImplementedError()