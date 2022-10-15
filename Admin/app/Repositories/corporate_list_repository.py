import Common.db_common as DB

class CorporateListRepository:
    def get_corporate_list() -> dict:
        result = DB.execute_select_sql('''
    select
        C.no,
        C.corporate_id,
        C.corporate_unique_name,
        C.corporate_name,
        DB.db_name
    FROM
        T_Corporate C
        LEFT OUTER JOIN T_Corporate_DB DB ON C.corporate_id = DB.corporate_id
    ORDER BY C.no
    '''
    ,'domain')
        return result
