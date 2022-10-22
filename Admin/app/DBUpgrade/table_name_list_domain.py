class table_domain:
    def __init__(self):
        self.M_NAVIGATION = 'M_Navigation'
    
    def get_table_list(self):
        table_list = []
        table_dict = vars(self)
        for key in table_dict:
            table_list.append(table_dict[key])
        return table_list