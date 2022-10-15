from ast import Or


class table:
    def __init__(self):
        self.T_CREATE_TABLE_LIST = 'T_Create_Table_List'
        self.T_USER = 'T_User'
        self.T_CUSTOMER = 'T_Customer'
        self.T_NAVIGATION = 'T_Navigation'
        self.T_CUSTOMER_ATTRIBUTE = 'T_Customer_Attribute'
        self.T_MASTER_LIST = 'T_Master_List'
        self.T_MASTER_DATA_ = 'T_Master_Data'
        self.T_CUSTOMER_LAYOUT = 'T_Customer_Layout'

    def get_table_list(self):
        table_list = []
        table_dict = vars(self)
        for table_name in table_dict:
            if table_dict[table_name].lower() == self.T_MASTER_DATA_.lower() or table_dict[table_name].lower() == self.T_CREATE_TABLE_LIST.lower():
                continue

            table_list.append(table_dict[table_name])
        return table_list