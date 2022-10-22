from Repositories.Navigation.INavigationRepository import INavigationRepository
import Common.db_common as DB
from Models.Navigation.NavigationModel import NavigationModel

class NavigationRepository(INavigationRepository):
    def __init__(self, corporate_id:int):
        self.corporate_id = corporate_id
        self.db_name = f'crm_{str(corporate_id).zfill(8)}'

    def get_navigation_list(self) -> list[NavigationModel]:
        navigation_list = []
        sql = f"""
        SELECT
          navigation_id
        FROM
          T_Navigation
        WHERE
          is_deleted = '0'
        """
        result = DB.execute_select_sql(sql, self.db_name)
        view_navigation_id_list_str = ''
        for navigation in result:
            if len(view_navigation_id_list_str) != 0:
                view_navigation_id_list_str += ','
            view_navigation_id_list_str += str(navigation['navigation_id'])

        if len(view_navigation_id_list_str) == 0:
            return navigation_list

        sql = f"""
        SELECT
          navigation_id,
          navigation_name
        FROM
          M_Navigation
        WHERE
          is_deleted = '0'
        AND
          navigation_id IN ({view_navigation_id_list_str})
        ORDER BY navigation_id
        """
        result = DB.execute_select_sql(sql, 'domain')
        for navigation in result:
            navigation_list.append(NavigationModel(navigation['navigation_id'], navigation['navigation_name']))
        return navigation_list
