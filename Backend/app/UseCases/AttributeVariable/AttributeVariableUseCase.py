from Services.AttributeVariable.AttributeVariableService import AttributeVariableService
from Repositories.AttributeVariable.AttributeVariableRepository import AttributeVariableRepository
from Models.AttributeVariable.AttributeVariableModel import AttributeVariableModel, AttributeVariableDataType

class AttributeVariableUseCase:
    def get_attribute_variable_list(corporate_id:int):
        service = AttributeVariableService(AttributeVariableRepository(corporate_id))
        return service.get_attribute_variable_list()

    def add_attribute_variable(corporate_id:int, attribute_name:str, attribute_description:str, attribute_data_type:AttributeVariableDataType, master_id:int):
        service = AttributeVariableService(AttributeVariableRepository(corporate_id))
        service.add_attribute_variable(attribute_name, attribute_description, attribute_data_type, master_id)