from typing import Optional, List, Dict

from pydantic import BaseModel, Field


# MultipleChoiceQuestion 클래스 정의
class MultipleChoiceQuestion(BaseModel):
    question: str = Field(description="Question of the text")
    options: List[str] = Field(description="Choices of the question")
    answer: int = Field(description="The index of the correct answer")
    explanation: str = Field(description="Explanation of the answer")


# 여러 개의 문제를 담기 위한 모델
class MultipleChoiceQuestionList(BaseModel):
    questions: List[MultipleChoiceQuestion] = Field(description="List of Questions ")
