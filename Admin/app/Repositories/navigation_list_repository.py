from unittest import result
import Common.db_common as DB

class NavigationListRepository:
    def get_navigation_list():
        result = DB.execute_select_sql("""
        SELECT
          navigation_id,
          navigation_name,
          is_deleted
        FROM
          M_Navigation
        ORDER BY navigation_id
        """, 'domain')
        return result

    def update_navigation_is_deleted(navigation_id:int, is_deleted:str) -> bool:
        DB.execute_sql(f"""
        UPDATE
          M_Navigation
        SET
          is_deleted = '{is_deleted}'
        WHERE
          navigation_id = {navigation_id}
        """, 'domain')

    def get_corporate_navigation_list(corporate_id:int) -> dict:
        result = []
        db_name = f'crm_{str(corporate_id).zfill(8)}'

        common_navigation_list = NavigationListRepository.get_navigation_list()
        navigation_id_list_str = ''
        for common_navigation in common_navigation_list:
            if common_navigation['is_deleted']:
                continue
            result.append(common_navigation)
            if len(navigation_id_list_str) != 0:
                navigation_id_list_str += ','
            navigation_id_list_str += str(common_navigation['navigation_id'])
        if len(navigation_id_list_str) == 0:
            return []
        comporate_navigation_list = DB.execute_select_sql(f"""
        SELECT
          navigation_id,
          is_deleted
        FROM
          T_Navigation
        WHERE
          navigation_id IN ({navigation_id_list_str})
        ORDER BY navigation_id
        """,db_name)
        for i in range(len(result)):
            result[i]['is_deleted'] = comporate_navigation_list[i]['is_deleted']
        return result

    def update_corporate_navigation_is_deleted(corporate_id:int, navigation_id:int, is_deleted:str) -> bool:
        db_name = f'crm_{str(corporate_id).zfill(8)}'
        DB.execute_sql(f"""
        UPDATE
          T_Navigation
        SET
          is_deleted = '{is_deleted}'
        WHERE
          navigation_id = {navigation_id}
        """, db_name)