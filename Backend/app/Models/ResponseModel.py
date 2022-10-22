from enum import Enum

class Status(Enum):
    OK = 200
    BAD_REQUEST = 400
    TIMEOUT = 408
    INTERNAL_SERVER_ERROR = 500

class ResponseModel:
    def __init__(self, status_code:Status, message:str, data:object=None) -> None:
        self.status_code = status_code
        self.message = message
        self.data = data

