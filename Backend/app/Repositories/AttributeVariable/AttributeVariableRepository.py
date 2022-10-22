from Models.AttributeVariable.AttributeVariableModel import AttributeVariableModel, AttributeVariableDataType
from Repositories.AttributeVariable.IAttributeVariableRepository import IAttributeVariableRepository
import Common.db_common as DB

class AttributeVariableRepository(IAttributeVariableRepository):
    def __init__(self, corporate_id:int):
        self.corporate_id = corporate_id
        self.db_name = f'crm_{str(corporate_id).zfill(8)}'

    def get_attribute_variable_list(self) -> list[AttributeVariableModel]:
        attribute_variable_list = []
        sql = f"""
        SELECT
          attribute_id,
          attribute_name,
          attribute_description,
          attribute_data_type,
          master_id,
          is_deleted
        FROM
          T_Customer_Attribute
        ORDER BY attribute_id
        """
        result = DB.execute_select_sql(sql, self.db_name)
        for attribute_variable in result:
            attribute_variable_list.append(AttributeVariableModel(
                attribute_variable['attribute_id'],
                attribute_variable['attribute_name'],
                attribute_variable['attribute_description'],
                attribute_variable['attribute_data_type'],
                attribute_variable['master_id'],
                attribute_variable['is_deleted']
            ))
        return attribute_variable_list
    
    def add_attribute_variable(self, attribute_name:str, attribute_description:str, attribute_data_type:AttributeVariableDataType, master_id:int):
        sql = f"""
        INSERT INTO T_Customer_Attribute
          (attribute_name, attribute_description, attribute_data_type, master_id)
        VALUES
          ('{attribute_name}', '{attribute_description}', {attribute_data_type.value}, {master_id})
        RETURNING attribute_id;
        """
        try:
          result = DB.execute_select_sql(sql, self.db_name)
        except Exception as e:
          DB.reset_seq_id(self.db_name, 'T_Customer_Attribute', 't_customer_attribute_attribute_id_seq', 'attribute_id')
        
        attribute_id = result[0]['attribute_id']
        sql = f"""
        CREATE TABLE T_Attribute{attribute_id}(
          customer_id INTEGER NOT NULL,
          attribute_value VARCHAR(2000) NOT NULL,
          create_user_id INTEGER DEFAULT 1,
          create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_user_id INTEGER DEFAULT 1,
          update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_deleted BOOL DEFAULT '0',
          CONSTRAINT T_Attribute{attribute_id}_customer_id PRIMARY KEY (customer_id)
        );
        """
        DB.execute_sql(sql, self.db_name)
        