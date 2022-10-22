from xxlimited import Str
from DBUpgrade.db_upgrade_creater import DBUpgradeCreateInfo, DBUpgradeColumn, DBUpgradeResponse, STATUS_SUCCESS, STATUS_FAILED, STATUS_WARNING
from DBUpgrade.table_name_list_domain import table_domain
from DBUpgrade.db_upgrade import INSERT, UPDATE, DELETE
import Common.db_common as DB

class DBUpgradeDomain:
    def __init__(self):
        self.db_name = 'domain'

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

    def upgrade_1(self):
        # Navigationテーブル作成
        dbUpgradeCreater = DBUpgradeCreateInfo(self.db_name, table_domain().M_NAVIGATION, True)
        dbUpgradeCreater.add_column(DBUpgradeColumn('navigation_id', 'SERIAL', True, True))
        dbUpgradeCreater.add_column(DBUpgradeColumn('navigation_name', 'VARCHAR(200)', True, False, True))
        return dbUpgradeCreater.execute_dll()

    def upgrade_2(self):
        # Navigation Data Insert
        def generate_insert_query(navigation_name:str) -> Str:
            return f"INSERT INTO {table_domain().M_NAVIGATION}(navigation_name) VALUES('{navigation_name}');"

        navigation_insert_name_list = ['顧客一覧','Web訪問履歴','配信','売上予測','売上管理','商品・在庫管理','Marketing分析','属性カスタマイズ']
        sql = ''
        for navigation_insert_name in navigation_insert_name_list:
            sql += generate_insert_query(navigation_insert_name)
        return self.execute_sql(sql, table_domain().M_NAVIGATION, INSERT)