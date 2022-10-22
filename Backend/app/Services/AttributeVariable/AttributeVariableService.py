from Repositories.AttributeVariable.IAttributeVariableRepository import IAttributeVariableRepository
from Models.AttributeVariable.AttributeVariableModel import AttributeVariableModel, AttributeVariableDataType

class AttributeVariableService:
    def __init__(self, repository:IAttributeVariableRepository):
        self.repository = repository

    def get_attribute_variable_list(self):
        return self.repository.get_attribute_variable_list()

    def add_attribute_variable(self, attribute_name:str, attribute_description:str, attribute_data_type:AttributeVariableDataType, master_id:int):
        self.repository.add_attribute_variable(attribute_name, attribute_description, attribute_data_type, master_id)