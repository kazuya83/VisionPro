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