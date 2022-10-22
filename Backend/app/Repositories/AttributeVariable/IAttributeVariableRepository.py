import abc
from Models.AttributeVariable.AttributeVariableModel import AttributeVariableModel, AttributeVariableDataType

class IAttributeVariableRepository(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def get_attribute_variable_list(self):
        raise NotImplementedError()

    @abc.abstractmethod
    def add_attribute_variable(self, attribute_name:str, attribute_description:str, attribute_data_type:AttributeVariableDataType, master_id:int):
        raise NotImplementedError()