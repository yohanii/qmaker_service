import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnswerNums from './AnswerNums';
import AnswerContent from './AnswerContent';
import ProgressBar from '../Quiz/ProgressBar';
import { ProblemCheckAnswer } from '../TestDataSet/ProblemCheckAnswer';
import './Answer.css';

function Answer() {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Results:', results);
    console.log('User Answers:', userAnswers);
  }, [results, userAnswers]);

  useEffect(() => {
    const fetchResults = async () => {
      // 세션 스토리지에서 사용자의 답변을 불러옵니다.
      const storedAnswers = JSON.parse(sessionStorage.getItem('answers')) || [];
      setUserAnswers(storedAnswers);

      // API 호출을 시뮬레이션합니다. 실제 구현 시에는 이 부분을 실제 API 호출로 대체하세요.
      const data = ProblemCheckAnswer;
      setResults(data.results);
    };
    fetchResults();
  }, []);

  const handleProblemSelect = (index) => {
    setCurrentProblem(index);
  };

  const handleNext = () => {
    if (currentProblem < 9) {
      setCurrentProblem(currentProblem + 1);
    }
  };

  const handlePrev = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
    }
  };

  const handleReset = () => {
    // 세션 스토리지 초기화
    sessionStorage.clear();
    // 홈페이지로 이동
    navigate('/');
  };

  if (!results) return <div>Loading...</div>;

  return (
    <div className="a-width-container">
      <div className="a-progress-wrapper">
        <ProgressBar solvedCount={10} />
      </div>
      <div className="a-sidebar">
        <AnswerNums
          currentProblem={currentProblem}
          onProblemSelect={handleProblemSelect}
          results={results}
          userAnswers={userAnswers}
        />
      </div>
      <div className="a-quiz">
        <div className="a-quiz-contents">
          <AnswerContent
            userAnswer={userAnswers[currentProblem]}
            problemIndex={currentProblem}
            result={results[currentProblem]}
          />
        </div>
        <div className="a-navigation-buttons">
          <button
            className="a-nav-button prev-button"
            onClick={handlePrev}
            disabled={currentProblem === 0}
          >
            ←
          </button>
          <button
            className="a-nav-button reset-button"
            onClick={handleReset}
          >
            Restart Q-maker
          </button>
          <button
            className="a-nav-button next-button"
            onClick={handleNext}
            disabled={currentProblem === 9}
          >
            →
          </button>
        </div>
      </div>
      <div className='ex-chart'>
        <div className='a-explanation'>
          <h3>설명</h3>
          {results[currentProblem].explanation}
        </div>
        <div className='a-chart'>
          {/* <Chart /> */}
          chart
        </div>
      </div>
    </div>
  );
}

export default Answer;


