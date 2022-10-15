from pickle import FALSE
import Common.db_common as DB
import global_value as g
from DBUpgrade.db_upgrade_creater import DBUpgradeCreateInfo, DBUpgradeColumn, DBUpgradeResponse, STATUS_SUCCESS, STATUS_FAILED
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
            error_message = f'''
            TABLE『{table_name}』に{sql_type_str}の処理を実行し失敗しました。
            エラー詳細：{e}
            '''
            return DBUpgradeResponse(STATUS_FAILED, error_message)
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
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_nmae', 'VARCHAR(200)', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_description', 'VARCHAR(2000)', False, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_data_type', 'INTEGER', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_id', 'INTEGER', False, False, False, '0'))
        return dbUpgradeCreater.execute_dll()

    def upgrade_7(self):
        # マスタデータリスト
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_MASTER_LIST)
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_name', 'VARCHAR(200)', True, False))
        dbUpgradeCreater.add_column(DBUpgradeColumn('description', 'VARCHAR(2000)', False, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_8(self):
        # マスタデータ1(性別マスタ)
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, f'{table().T_MASTER_DATA_}1')
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_id', 'INTEGER', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_value', 'VARCHAR(2000)', True, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_9(self):
        # マスタデータ1(性別マスタ)挿入
        sql = f'''
        INSERT INTO {table().T_MASTER_DATA_}1(master_data_id, master_data_value) VALUES(0, '不明');
        INSERT INTO {table().T_MASTER_DATA_}1(master_data_id, master_data_value) VALUES(1, '男');
        INSERT INTO {table().T_MASTER_DATA_}1(master_data_id, master_data_value) VALUES(2, '女');
        '''
        return self.execute_sql(sql, f'{table().T_MASTER_DATA_}1', INSERT)

    def upgrade_10(self):
        # マスタデータ2(都道府県マスタ)
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, f'{table().T_MASTER_DATA_}2')
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_id', 'INTEGER', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('master_data_value', 'VARCHAR(2000)', True, False))
        return dbUpgradeCreater.execute_dll()

    def upgrade_11(self):
        # マスタデータ2(都道府県マスタ)挿入
        sql = f'''
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(1, '北海道');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(2, '青森県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(3, '岩手県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(4, '宮城県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(5, '秋田県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(6, '山形県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(7, '福島県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(8, '茨城県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(9, '栃木県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(10,'群馬県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(11,'埼玉県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(12,'千葉県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(13,'東京都');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(14,'神奈川県');	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(15,'新潟県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(16,'富山県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(17,'石川県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(18,'福井県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(19,'山梨県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(20,'長野県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(21,'岐阜県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(22,'静岡県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(23,'愛知県');	   	
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(24,'三重県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(25,'滋賀県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(26,'京都府');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(27,'大阪府');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(28,'兵庫県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(29,'奈良県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(30,'和歌山県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(31,'鳥取県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(32,'島根県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(33,'岡山県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(34,'広島県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(35,'山口県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(36,'徳島県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(37,'香川県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(38,'愛媛県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(39,'高知県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(40,'福岡県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(41,'佐賀県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(42,'長崎県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(43,'熊本県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(44,'大分県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(45,'宮崎県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(46,'鹿児島県');
        INSERT INTO {table().T_MASTER_DATA_}2(master_data_id, master_data_value) VALUES(47,'沖縄県');
        '''
        return self.execute_sql(sql, f'{table().T_MASTER_DATA_}2', INSERT)

    def upgrade_12(self):
        # 顧客属性レイアウト用
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table().T_CUSTOMER_LAYOUT)
        dbUpgradeCreater.add_column(DBUpgradeColumn('layout_id', 'INTEGER', True, True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('attribute_id', 'INTEGER', True, False))
        return dbUpgradeCreater.execute_dll()