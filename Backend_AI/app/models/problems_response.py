from typing import Optional, List, Dict

from pydantic import BaseModel, Field


# Problem 클래스 정의
class Problem(BaseModel):
    question: str = Field(description="Question of the text")
    options: List[str] = Field(description="Choices of the problem")
    answer: int = Field(description="The index of the correct answer")
    explanation: str = Field(description="Explanation of the answer")
    category: str = Field(description="Category of the problem")


# 여러 개의 문제를 담기 위한 모델
class ProblemsResponse(BaseModel):
    count: int = Field(description="Number of problems")
    categories: List[str] = Field(description="Categories of the problems")
    problems: List[Problem] = Field(description="List of problems ")



class UserTextCategorise(BaseModel):
    category: str = Field(description="Category of user text")
    origin_text: str = Field(description="Original text of the user text")

