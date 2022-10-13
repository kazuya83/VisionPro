import random
import Common.db_common as DB

class CreateDB:
    def __init__(self, corporate_unique_name:str, corporate_name:str, corporate_id:int=0):
        self.corporate_unique_name = corporate_unique_name
        self.corporate_name = corporate_name
        self.corporate_id = corporate_id

    def create_corporate(self):
        new_corporate_id = self.generate_corporate_id()
        sql = f'''
        INSERT INTO T_Corporate(corporate_id, corporate_unique_name, corporate_name) VALUES({new_corporate_id}, '{self.corporate_unique_name}', '{self.corporate_name}')
        '''
        DB.execute_sql(sql, 'domain')
        self.corporate_id = corporate_id
        self.create_corporate_db()

    def create_corporate_db(self):
        db_name = f'crm_{str(self.corporate_id).zfill(8)}'
        sql = f'''
        CREATE DATABASE {db_name};
        GRANT ALL PRIVILEGES ON DATABASE {db_name} TO visionpro;
        '''
        DB.execute_sql(sql, 'domain')

        sql = f'''
        INSERT INTO T_Corporate_DB(corporate_id, db_name) VALUES({self.corporate_id}, '{db_name}')
        '''
        DB.execute_sql(sql, 'domain')
        
    def generate_corporate_id(self) -> int:
        # 8桁の数値からランダムに企業IDを発行
        new_corporate_id = random.randrange(99999999) + 1
        if not self.exist_corporate_id(new_corporate_id):
            return generate_corporate_id()
        return new_corporate_id

    def exist_corporate_id(self, new_corporate_id) -> bool:
        sql = f'''
        SELECT 1
        FROM T_Corporate
        WHERE corporate_id = {new_corporate_id}
        '''
        result = DB.execute_select_sql(sql, 'domain')
        return len(result) != 0
