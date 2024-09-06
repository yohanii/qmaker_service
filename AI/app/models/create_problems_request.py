from pydantic import BaseModel


class CreateProblemsRequest(BaseModel):
    note : str = ""