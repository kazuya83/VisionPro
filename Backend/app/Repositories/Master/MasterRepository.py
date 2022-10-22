from Models.Master.MasterModel import MasterModel
from Repositories.Master.IMasterRepository import IMasterRepository
from Models.Master.MasterModel import MasterModel
from Models.Master.MasterDataModel import MasterDataModel
import Common.db_common as DB

class MasterRepository(IMasterRepository):
    def __init__(self, corporate_id:int):
        self.corporate_id = corporate_id
        self.db_name = f'crm_{str(corporate_id).zfill(8)}'

    def get_master_list(self) -> list[MasterModel]:
        master_list = []
        sql = f"""
        SELECT
          master_id,
          master_name,
          description
        FROM
          T_Master_List
        WHERE
          is_deleted = '0'
        ORDER BY master_id
        """
        result = DB.execute_select_sql(sql, self.db_name)
        for master in result:
            master_list.append(MasterModel(master['master_id'], master['master_name'], master['description']))
        return master_list

    def add_master(self, master_name:str, description:str) -> None:
        sql = f"""
        INSERT INTO T_Master_List
          (master_name, description)
        VALUES
          ('{master_name}', '{description}')
        RETURNING master_id
        ;
        """
        try:
          result = DB.execute_select_sql(sql, self.db_name)
        except Exception as e:
          self.reset_seq_id('T_Master_List', 't_master_list_master_id_seq', 'master_id')
          raise e
        
        if len(result) != 1:
          self.reset_seq_id('T_Master_List', 't_master_list_master_id_seq', 'master_id')
          raise Exception('登録に失敗しました')
        master_id = result[0]['master_id']
        sql = f"""
        CREATE TABLE T_Master_Data{master_id}(
          master_data_id SERIAL NOT NULL,
          master_data_value VARCHAR(2000) NOT NULL,
          create_user_id INTEGER DEFAULT 1,
          create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_user_id INTEGER DEFAULT 1,
          update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_deleted BOOL DEFAULT '0',
          CONSTRAINT T_Master_Data{master_id}_master_data_id PRIMARY KEY (master_data_id),
          CONSTRAINT T_Master_Data{master_id}_master_data_value_unique UNIQUE (master_data_value)
        );
        """
        DB.execute_sql(sql, self.db_name)

    def get_master_data_list(self, master_id:int) -> list[MasterDataModel]:
        master_data_list = []
        sql = f"""
        SELECT
          master_data_id,
          master_data_value
        FROM
          T_Master_Data{master_id}
        WHERE
          is_deleted = '0'
        ORDER BY master_data_id
        """
        result = DB.execute_select_sql(sql, self.db_name)
        for master_data in result:
            master_data_list.append(MasterDataModel(master_data['master_data_id'], master_data['master_data_value']))
        return master_data_list

    def add_master_data(self, master_id:int, master_data_value:str) -> None:
        sql = f"INSERT INTO T_Master_Data{master_id}(master_data_value) VALUES('{master_data_value}');"
        try:
          DB.execute_sql(sql, self.db_name)
        except Exception as e:
          
          self.reset_seq_id(f'T_Master_Data{master_id}', f'T_Master_Data{master_id}_master_data_id_seq', 'master_data_id')
          raise e
        
    def reset_seq_id(self, table_name, seq_name, column_name):
        DB.reset_seq_id(self.db_name, table_name, seq_name, column_name)