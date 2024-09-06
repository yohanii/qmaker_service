import sys
import os
import pickle
import json
import ast

from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from pydantic import BaseModel, Field
from typing import List
from app.models.problems_response import UserTextCategorise

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

def data_cleaning(ref_text: str) -> str:
    cleaned_data_json = ref_text.replace('json', '')
    cleaned_data_back = cleaned_data_json.replace('```', '')
    cleaned_data = cleaned_data_back.strip()
    return cleaned_data

def question_categorize(ref_text) -> str:
    llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.3)
    textbook = '''
    text : {text}
    당신은 텍스트 문서의 내용을 주제별로 분류하는 문서 분류기입니다.
    1. category
    : 사용자가 제공한 text 문서를 반드시 5개의 주제(카테고리)로 분류하세요.
        - 예를 들어 클라우드 컴퓨팅이 주제인 text라면 클라우드 컴퓨팅의 개념, 클라우드 네이티브, AWS, EC2, 보안과 프라이버시라는 카테고리로 분류할 수 있습니다.
        - 분류한 주제를 각각 A, B, C, D, E라고 부르겠습니다.
        - 지엽적인 내용이 하나의 카테고리가 되는 것은 지양해야 합니다.
    2. origin_text
    : 사용자가 제공한 text 문서를 1에서 분류한 주제에 맞게 나누세요.
        - 예를 들어 A 카테고리에 해당하는 내용을 전체 text 문서에서 찾으세요.
        - 그리고 나누어진 내용을 각각 문자열로 origin_text에 저장하세요.
        - 이때 반드시 분류한 문서 내용을 원문 그대로 저장하세요. 문서를 요약하거나 다른 형식으로 저장하지 마세요.
        - A문서부터 E문서를 모두 더한 분량이 반드시 전체 text 문서의 분량과 같아야 합니다. 즉 전체 text 문서 분량 중에서 origin_text에 포함되지 않는 내용이 한 글자라도 있어서는 안 됩니다.
    출력 방식은 다음과 같습니다:
    - json형식이다.
    - [{{"category" : "", "origin_text" : ""}}, {{}}]
    
    '''
    # ChatPromptTemplate을 사용해 프롬프트 생성
    prompt = ChatPromptTemplate.from_template(textbook)

    chain = prompt | llm | StrOutputParser()

    response = chain.invoke({
        'text': ref_text
    })
    # print(response)
    cleaned_response = data_cleaning(response)
    categorises = json.loads(cleaned_response)
    user_texts_list = [UserTextCategorise(**c) for c in categorises]

    return user_texts_list


def question_generation(ref_text, text_category) -> str:
    llm = ChatOpenAI(model='gpt-4o-mini', temperature=0.3)
    textbook = '''
    text : {text}
    당신은 공부 정리 자료에서 객관식 문제를 만들어주는 문제 제조기입니다.
    사용자가 제공한 text를 바탕으로 시험문제를 만들어주세요.
    제공된 text 이외의 정보에서 문제를 출제해서는 안됩니다.
    당신이 제공해야 할 내용은 문제, 선택지, 정답, 출처입니다.

    출처는 다음과 같은 기준을 따릅니다:
    - 출처는 문제를 출제한 text의 구체적인 내용을 의미합니다.
    - 출처는 text의 전체적인 내용을 요약한 것이 아니며, text에서 실제로 사용된 문장을 그대로 사용해야 합니다.

    출처의 예시:
    - 엣지 컴퓨팅 - 데이터를 클라우드 데이터센터가 아닌 로컬, 네트워크의 엣지에서 처리하므로 지연 시간과 대역폭 요구 사항이 최소화됨
    - 인스턴스 - 방화벽, 라우터, VPN, 스토리지 서비스도 인스턴스로 구현할 수 있음
    - 최적화 - 왜 조금씩 weight을 옮겨가면서 하냐? 확 확 안 옮기고 - weight가 어떤 시점에 고정됐을 때 로스는 알 수 있지만, 모든 weight의 로스를 한번에 알 수 없기 때문이다

    시험문제의 형식은 다음과 같습니다:
    - 객관식, 4지선다형입니다.
    - 정답은 반드시 한 개여야 합니다.
    - 문제는 총 2개 출제해주세요.

    출력 방식은 다음과 같습니다:
    - [{{"question" : "", "options" : ["", "", "", ""], "answer" : 0, "explanation" : "","category" : ""}}, {{}}]
    - question은 문제 내용, options는 선택지, answer는 정답, explanation은 문제 출처, category는 {category}입니다.
    - answer는 0, 1, 2, 3 중 하나로, 선택지를 의미합니다.
    '''
    # ChatPromptTemplate을 사용해 프롬프트 생성
    prompt = ChatPromptTemplate.from_template(textbook)

    chain = prompt | llm | StrOutputParser()

    response = chain.invoke({
        'text': ref_text,
        'category': text_category
    })
    # print(response)
    #try:
    cleaned_response = data_cleaning(response)
    #except Exception as e:
    #    cleaned_response = response
    return cleaned_response


def category_question_generation(ref_text) -> list:
    category_text = question_categorize(ref_text)
    low_categories = set([p.category for p in category_text])
    print(len(ref_text))
    print(len(low_categories))
    for n in range(0, 3):
        if len(low_categories) == 5:
            break
        if n == 0:
            if len(ref_text) <= 5000 and len(ref_text) >= 2000:
                ref_text = ref_text[:-1000]
            else:
                ref_text = ref_text[:5000]
        else:
            if len(ref_text) >= 2000:
                ref_text = ref_text[:-1000]

        category_text = question_categorize(ref_text)
        print(len(low_categories))
        print(len(ref_text))
    category_questions = []
    for category in category_text:
        category_questions.extend(json.loads(question_generation(category.origin_text, category.category)))
    return category_questions, low_categories



