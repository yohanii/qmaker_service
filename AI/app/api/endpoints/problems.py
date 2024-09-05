import json

from fastapi import APIRouter

from app.api.dto.multiple_choice_question import MultipleChoiceQuestion, MultipleChoiceQuestionList
# from app.models.info import Info
from app.services.question_maker import question_generation
import logging

router = APIRouter()
logger = logging.getLogger("uvicorn")


@router.post("/problems")
async def get_question(ref_text: str = "") -> MultipleChoiceQuestionList:
    logger.info("get_question start")
    logger.info(f"ref_text : {ref_text}")
    questions_list = json.loads(question_generation(ref_text))
    question_list = MultipleChoiceQuestionList(
        questions=[MultipleChoiceQuestion(**question) for question in questions_list])
    logger.info(f"entities : {question_list}")

    return question_list
