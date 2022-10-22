from Repositories.Login.ILoginCorporateRepository import ILoginCorporateRepository
from Models.CorporateModel import CorporateModel
import Common.db_common as DB

class LoginCorporateRepository(ILoginCorporateRepository):
    def get_corporate_info(self, corporate_unique_name:str) -> CorporateModel:
        sql = f"""
        SELECT
          corporate_id,
          corporate_unique_name,
          corporate_name
        FROM
          T_Corporate
        WHERE
          is_deleted = '0'
        AND
          corporate_unique_name = '{corporate_unique_name}'
        """
        result = DB.execute_select_sql(sql, 'domain')
        if len(result) != 1:
            return None
        return CorporateModel(result[0]['corporate_id'], result[0]['corporate_name'], result[0]['corporate_unique_name'])
        
    def get_valid_corporate_info(self, corporate_id:int, corporate_unique_name:str) -> bool:
        sql = f"""
        SELECT
          corporate_id,
          corporate_unique_name,
          corporate_name
        FROM
          T_Corporate
        WHERE
          is_deleted = '0'
        AND
          corporate_id = {corporate_id}
        AND
          corporate_unique_name = '{corporate_unique_name}'
        """
        result = DB.execute_select_sql(sql, 'domain')
        if len(result) != 1:
            return False
        return True