from Repositories.Login.ILoginRepository import ILoginRepository
import global_value as g
from scryp import encrypt
import Common.db_common as DB
from Models.CorporateUserModel import CorporateUserModel

class LoginRepository(ILoginRepository):
    def __init__(self, corporate_id:int):
        self.corporate_id = corporate_id
        self.db_name = f'crm_{str(corporate_id).zfill(8)}'
    
    def encrypt(self, password):
        return encrypt(g.ENCRYPT_STR, password)

    def exists_corporate_user(self, user_name:str, password:str) -> bool:
        sql = f"""
        SELECT
          1
        FROM
          T_User
        WHERE
          is_deleted = '0'
        AND
          user_name = '{user_name}'
        AND
          password = '{self.encrypt(password)}'
        """
        result = DB.execute_select_sql(sql, self.db_name)
        return result != 0

    def get_corporate_user_info(self, user_name: str, password: str) -> CorporateUserModel:
        sql = f"""
        SELECT
          user_id,
          user_name
        FROM
          T_User
        WHERE
          is_deleted = '0'
        AND
          user_name = '{user_name}'
        AND
          password = '{self.encrypt(password)}'
        """
        result = DB.execute_select_sql(sql, self.db_name)
        if len(result) == 0:
          return None
        return CorporateUserModel(result[0]['user_id'], result[0]['user_name'])

    def get_valid_corporate_user(self, user_id:int, user_name:str) -> bool:
        sql = f"""
        SELECT
            user_id,
            user_name
          FROM
            T_User
          WHERE
            is_deleted = '0'
          AND
            user_name = '{user_name}'
          AND
            user_id = {user_id}
        """
        result = DB.execute_select_sql(sql, self.db_name)
        if len(result) == 0:
          return False
        return True