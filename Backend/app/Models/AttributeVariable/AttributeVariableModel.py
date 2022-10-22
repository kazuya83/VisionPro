from enum import Enum

class AttributeVariableDataType(Enum):
    STRING = 1
    NUMBER = 2
    DATE = 3
    MASTER = 4

class AttributeVariableModel:
    def __init__(self, attribute_id:int, attribute_name:str, attribute_description:str, attribute_data_type:AttributeVariableDataType, master_id:int, is_deleted:bool=False):
        self.attribute_id = attribute_id
        self.attribute_name = attribute_name
        self.attribute_description = attribute_description
        self.attribute_data_type = attribute_data_type
        self.master_id = master_id
        self.is_deleted = is_deleted