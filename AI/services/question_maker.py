import sys
import os
import pickle
import json
import ast
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from pydantic import BaseModel, Field
from typing import List


def question_generation(ref_text) -> str:
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
    - 문제는 총 10개 출제해주세요.

    출력 방식은 다음과 같습니다:
    - [{{"question" : "", "options" : ["", "", "", ""], "answer" : 0, "explanation" : ""}}, {{}}]
    - question은 문제 내용, options는 선택지, answer는 정답, explanation은 문제 출처입니다.
    - answer는 0, 1, 2, 3 중 하나로, 선택지를 의미합니다.
    '''
    # ChatPromptTemplate을 사용해 프롬프트 생성
    prompt = ChatPromptTemplate.from_template(textbook)

    chain = prompt | llm | StrOutputParser()

    response1 = chain.invoke({
        'text': ref_text
    })

    return response1
