import { ProblemCheckAnswer } from '../TestDataSet/ProblemCheckAnswer';

function Answer() {
  const { results } = ProblemCheckAnswer;
  // quiz 페이지 쪽에서 기존 문제 데이터가 여기까지 넘어와야함 (기존 문제를 넣어야하니까!)
  return (
    <div>
      <h2>Answer Page</h2>
      {results && results.length > 0 ? (
        <div>
          <h3>결과</h3>
          {results.map((result, index) => (
            <div key={index}>
              <p>
                문제 {index + 1}: {result.correct ? '정답' : '오답'}
              </p>
              <p>설명: {result.explanation}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>결과를 받을 수 없습니다.</p>
      )}
    </div>
  );
}

export default Answer;
