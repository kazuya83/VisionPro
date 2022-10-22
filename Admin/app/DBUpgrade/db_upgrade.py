import Common.db_common as DB
import global_value as g
from DBUpgrade.db_upgrade_creater import DBUpgradeCreateInfo, DBUpgradeColumn, DBUpgradeResponse, STATUS_SUCCESS, STATUS_FAILED, STATUS_WARNING
from DBUpgrade.table_name_list import table
# from Crypto.Cipher import AES
# from Crypto.Hash import SHA256
# from Crypto import Random
from scryp import encrypt

INSERT = 1
UPDATE = 2
DELETE = 3

class DBUpgrade:
    def __init__(self, corporate_id:int):
        self.corporate_id = corporate_id
        str_id = str(corporate_id).zfill(8)
        self.db_name = f'crm_{str_id}'

    # Insert・Update・Delete用
    def execute_sql(self, sql:str, table_name:str, sql_type:int) -> DBUpgradeResponse:
        sql_type_str = ''
        if sql_type == INSERT:
            sql_type_str = 'Insert'
        elif sql_type == UPDATE:
            sql_type_str = 'Update'
        elif sql_type == DELETE:
            sql_type_str = 'Delete'

        try:  
            DB.execute_sql(sql, self.db_name)
        except Exception as e:
            error_status_code = STATUS_FAILED
            error_detail = str(e)
            if 'duplicate key' in str(e):
                error_status_code = STATUS_WARNING
                error_detail = 'データ挿入重複エラー'
            error_message = f'''
            TABLE『{table_name}』に{sql_type_str}の処理を実行し失敗しました。
            エラー詳細：{error_detail}
            '''
            return DBUpgradeResponse(error_status_code, error_message)
        return DBUpgradeResponse(STATUS_SUCCESS, f'TABLE『{table_name}』に{sql_type_str}の処理を実行し成功しました。')

    def encrypt(self, password):
        return encrypt(g.ENCRYPT_STR, password)

    def upgrade_1(self):
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_CREATE_TABLE_LIST)
        dbUpgradeCreater.add_column(DBUpgradeColumn('table_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('table_name', 'VARCHAR(200)', True, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_2(self):
        # VisionProユーザ情報
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_USER)
        dbUpgradeCreater.add_column(DBUpgradeColumn('user_id', 'SERIAL', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('user_name', 'VARCHAR(100)', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('password', 'VARCHAR(1000)', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('mail_address', 'VARCHAR(2000)', False, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_3(self):
        # エンドユーザ（顧客）情報挿入
        sql = f"INSERT INTO {table().T_USER}(user_name, password, mail_address) VALUES('admin', '{self.encrypt('admin')}', '');"
        return self.execute_sql(sql, f'{table().T_USER}1', INSERT)

    def upgrade_4(self):
        # エンドユーザ（顧客）情報
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_CUSTOMER)
        dbUpgradeCreater.add_column(DBUpgradeColumn('customer_id', 'SERIAL', True, True))
        return dbUpgradeCreater.execute_dll()

    def upgrade_5(self):
        # ナビゲーションバー
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_NAVIGATION)
        dbUpgradeCreater.add_column(DBUpgradeColumn('navigation_id', 'INTEGER', True, True))
        return dbUpgradeCreater.execute_dll()

    def upgrade_6(self):
        # 顧客の属性管理
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_CUSTOMER_ATTRIBUTE)
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_name', 'VARCHAR(200)', True, False, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_description', 'VARCHAR(2000)', False, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_data_type', 'INTEGER', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_id', 'INTEGER', False, False, False, '0'))
        return dbUpgradeCreater.execute_dll()

    def upgrade_7(self):
        # マスタデータリスト
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_MASTER_LIST)
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_name', 'VARCHAR(200)', True, False, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('description', 'VARCHAR(2000)', False, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_8(self):
        # マスタデータ1(性別マスタ)
        sql = f"INSERT INTO {table().T_MASTER_LIST}(master_name, description) VALUES('性別', '');"
        self.execute_sql(sql, f'{table().T_MASTER_LIST}', INSERT)
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, f'{table().T_MASTER_DATA_}1')
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_value', 'VARCHAR(2000)', True, False, True))
        return dbUpgradeCreater.execute_dll()

    def upgrade_9(self):
        # マスタデータ1(性別マスタ)挿入
        sql = f'''
        INSERT INTO {table().T_MASTER_DATA_}1(master_data_value) VALUES('不明');
        INSERT INTO {table().T_MASTER_DATA_}1(master_data_value) VALUES('男');
        INSERT INTO {table().T_MASTER_DATA_}1(master_data_value) VALUES('女');
        '''
        return self.execute_sql(sql, f'{table().T_MASTER_DATA_}1', INSERT)

    def upgrade_10(self):
        # マスタデータ2(都道府県マスタ)
        sql = f"INSERT INTO {table().T_MASTER_LIST}(master_name, description) VALUES('都道府県', '');"
        self.execute_sql(sql, f'{table().T_MASTER_LIST}', INSERT)
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, f'{table().T_MASTER_DATA_}2')
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_value', 'VARCHAR(2000)', True, False, True))
        return dbUpgradeCreater.execute_dll()

    def upgrade_11(self):
        # マスタデータ2(都道府県マスタ)挿入
        sql = f'''
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('北海道');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('青森県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('岩手県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('宮城県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('秋田県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('山形県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('福島県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('茨城県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('栃木県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('群馬県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('埼玉県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('千葉県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('東京都');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('神奈川県');	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('新潟県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('富山県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('石川県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('福井県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('山梨県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('長野県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('岐阜県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('静岡県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('愛知県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('三重県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('滋賀県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('京都府');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('大阪府');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('兵庫県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('奈良県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('和歌山県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('鳥取県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('島根県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('岡山県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('広島県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('山口県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('徳島県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('香川県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('愛媛県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('高知県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('福岡県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('佐賀県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('長崎県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('熊本県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('大分県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('宮崎県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('鹿児島県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_value) VALUES('沖縄県');
        '''
        return self.execute_sql(sql, f'{table().T_MASTER_DATA_}2', INSERT)

    def upgrade_12(self):
        # 顧客属性レイアウト用
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_CUSTOMER_LAYOUT)
        dbUpgradeCreater.add_column(DBUpgradeColumn('layout_id', 'INTEGER', True, True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_id', 'INTEGER', True, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_13(self):
        # Navigationデータ挿入
        try:
            sql = f"SELECT navigation_id FROM {table().T_NAVIGATION} WHERE is_deleted = '0'"
            result = DB.execute_select_sql(sql, self.db_name)
            
            current_navigation_id_str = ''
            for current_navigation in result:
                if len(current_navigation_id_str) != 0:
                    current_navigation_id_str += ','
                current_navigation_id_str += str(current_navigation['navigation_id'])
            where_query = ''
            if len(current_navigation_id_str) != 0:
                where_query = f'AND navigation_id NOT IN ({current_navigation_id_str})'

            sql = f"SELECT navigation_id FROM M_Navigation WHERE is_deleted = '0' {where_query}"
            except_insert_navigation_list = DB.execute_select_sql(sql, 'domain')

            if len(except_insert_navigation_list) == 0:
                return DBUpgradeResponse(STATUS_WARNING, f'TABLE『{table().T_NAVIGATION}』のInsert処理が不要だったためスキップしました。')

            sql = ''
            for except_insert_navigation in except_insert_navigation_list:
                sql += f"INSERT INTO {table().T_NAVIGATION}(navigation_id) VALUES({except_insert_navigation['navigation_id']});"
            
            return self.execute_sql(sql, f'{table().T_MASTER_DATA_}2', INSERT)
        except Exception as e:
            error_message = f'''
            TABLE『T_Navigation』のInsert処理でエラーが発生しました。
            エラー詳細：{e}
            '''
            return DBUpgradeResponse(STATUS_FAILED, error_message)

    def upgrade_14(self):
        # 顧客一覧フォルダ用
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_CUSTOMER_FOLDER)
        dbUpgradeCreater.add_column(DBUpgradeColumn('folder_id', 'INTEGER', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('folder_name', 'VARCHAR(2000)', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('parent_folder_id', 'INTEGER', True, False))
        return dbUpgradeCreater.execute_dll()