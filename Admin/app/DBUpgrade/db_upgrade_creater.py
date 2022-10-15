import Common.db_common as DB
import DBUpgrade.db_upgrade_attach_info as db_upgrade_info

STATUS_SUCCESS = 200
STATUS_FAILED = 500

class DBUpgradeResponse:
    def __init__(self, status_code:int, message:str):
        self.status_code = status_code
        self.message = message

class DBUpgradeCreateInfo:
    def __init__(self, db_name:str, table_name:str):
        self.db_name = db_name
        self.table_name = table_name
        self.column_list = []

    def add_column(self, column):
        self.column_list.append(column)

    def execute_dll(self) -> DBUpgradeResponse:
        dll = self.generate_dll()
        try:
            DB.execute_sql(dll, self.db_name)
            db_upgrade_info.add_db_upgrade_attach(self.db_name, self.table_name)
        except Exception as e:
            error_message = f'''
            TABLE『{self.table_name}』の作成に失敗しました。
            エラー詳細：{e}
            '''
            return DBUpgradeResponse(STATUS_FAILED, error_message)
        return DBUpgradeResponse(STATUS_SUCCESS, f'TABLE『{self.table_name}』の作成に成功しました。')

    def generate_dll(self):
        dll = f'CREATE TABLE {self.table_name} ('
        for column in self.column_list:
            dll += column.get_column_dll()
        dll += f'''
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_deleted BOOL DEFAULT '0'
        {self.get_primary_dll()}
        {self.get_unique_dll()}
        );
        '''
        return dll
    
    def get_primary_dll(self):
        primary_column = ''
        for column in self.column_list:
            if not column.is_primary:
                continue
            if len(primary_column) != 0:
                primary_column += ','
            primary_column += column.column_name
        if len(primary_column) == 0:
            return ''
        return f',PRIMARY KEY ({primary_column})'

    def get_unique_dll(self):
        unique_column = ''
        unique_key_name = ''
        for column in self.column_list:
            if not column.is_unique:
                continue
            if len(unique_column) != 0:
                unique_column += ','
            unique_column += column.column_name
            unique_key_name += f'{column.column_name}_'
        if len(unique_column) == 0:
            return ''
        return f',CONSTRAINT {unique_key_name}unique UNIQUE ({unique_column})'

class DBUpgradeColumn:
    def __init__(self, column_name:str, type_str:str, is_not_null:bool, is_primary:bool, is_unique:bool=False, default_value:str=None):
        self.column_name = column_name
        self.type_str = type_str
        self.is_not_null = is_not_null
        self.is_primary = is_primary
        self.is_unique = is_unique
        self.default_value = default_value

    def get_column_dll(self):
        column_dll = f'{self.column_name} {self.type_str} '
        if self.is_not_null:
            column_dll += 'NOT NULL '
        if self.default_value is not None:
            column_dll += f'DEFAULT {self.default_value} '
        if self.is_unique:
            column_dll += 'UNIQUE '
        column_dll += ','
        return column_dll