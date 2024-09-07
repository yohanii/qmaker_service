// 노트 데이터 보내기
export async function SendNoteData(textValue) {
  try {
    const response = await fetch(
      `http://backend-alb-1085769372.ap-northeast-2.elb.amazonaws.com/api/v1/problem-sets`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          note: textValue,
        }),
      }
    );
    const ProblemData = await response.json();
    return ProblemData;
  } catch (error) {
    console.error(error);
    throw new Error('노트 보내기에 실패했습니다.');
  }
}

// 채점 결과
export async function AnswerData(id, answers) {
  const answerString = answers.join(',');
  try {
    const response = await fetch(
      `http://backend-alb-1085769372.ap-northeast-2.elb.amazonaws.com/api/v1/problem-sets/${id}/solved?answers=${answerString}`,
      {
        method: 'GET',
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('API 요청 실패');
    }
  } catch (error) {
    console.error('네트워크 오류:', error);
  }
}
