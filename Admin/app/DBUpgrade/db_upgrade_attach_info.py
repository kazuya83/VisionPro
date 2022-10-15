import Common.db_common as DB
from DBUpgrade.table_name_list import table

class DBUpgradeAttach:
  def __init__(self, table_name:str, is_attach:bool):
      self.table_name = table_name
      self.is_attach = is_attach


def get_db_upgrade_attach(corporate_id:int) -> list:
  db_name = f'crm_{str(corporate_id).zfill(8)}'
  table_attach_list = []

  result = []
  try:
    sql = f'''
    SELECT
      table_name
    FROM
      {table().T_CREATE_TABLE_LIST}
    WHERE
      is_deleted = '0'
    '''
    result = DB.execute_select_sql(sql, db_name)
  except Exception as e:
    print(e)

  for table_name in table().get_table_list():
    table_attach = { 'table_name': table_name, "is_attach": False }
    for row in result:
      if table_name.lower() == row['table_name'].lower():
        table_attach['is_attach'] = True
    table_attach_list.append(table_attach)
  return table_attach_list
    
def add_db_upgrade_attach(db_name:str, table_name:str) -> None:
  sql = f"INSERT INTO {table().T_CREATE_TABLE_LIST}(table_name) VALUES('{table_name}');"
  DB.execute_sql(sql, db_name)
