import Common.db_common as DB

class DBUpgrade:
    def __init__(self, corporate_id:int):
        str_id = str(corporate_id).zfill(8)
        self.db_name = f'crm_{str_id}'

    def execute_sql(self, sql) -> None:
        DB.execute_sql(sql, self.db_name)

    def all_upgrade(self) -> str:
        log = ''
        log += 'upgrade_1:¥n' + self.upgrade_1()
        return log


    def upgrade_1() -> str:
        sql = f'''
        CREATE TABLE T_Customer (
            customer_id SERIAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_deleted BOOL DEFAULT '0',
            PRIMARY KEY (customer_id)
        );
        '''
        self.execute_sql(sql)
        return sql