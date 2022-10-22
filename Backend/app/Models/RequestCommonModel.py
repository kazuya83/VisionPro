from pydantic import BaseModel

class RequestCommonModel(BaseModel):
    corporate_id:int
    corporate_unique_name:str
    user_id:int
    user_name:str