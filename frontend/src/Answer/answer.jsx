// src/Answer.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AnswerNums from './AnswerNums';
import AnswerContent from './AnswerContent';
import ProgressBar from '../Quiz/ProgressBar';
import ChartResult from '../Chart/ChartResult';
import { AnswerData } from '../util/http';
import './Answer.css';

function Answer() {
  const location = useLocation();
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [allresults, setallresults] = useState(null);

  const problemData = location.state?.problemData;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      // 세션 스토리지에서 사용자의 답변을 불러옵니다.
      const storedAnswers = JSON.parse(sessionStorage.getItem('answers')) || [];
      setUserAnswers(storedAnswers);

      // URL에서 문제 집합 ID를 가져옵니다.
      const id = sessionStorage.getItem('problemId');

      // API 호출
      const data = await AnswerData(id, storedAnswers);
      console.log(data);
      if (data) {
        setResults(data.results);
        setallresults(data);
        sessionStorage.setItem('scoreObj', JSON.stringify(data.score));
      } else {
        console.error('데이터를 가져오는 데 실패했습니다.');
      }
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

  if (!allresults) return <div>Loading...</div>;

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
          problemData={problemData.problems}
        />
      </div>
      <div className="a-quiz">
        <div className="a-quiz-contents">
          <AnswerContent
            userAnswer={userAnswers[currentProblem]}
            problemIndex={currentProblem}
            result={results[currentProblem]}
            problemData={problemData}
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
          <button className="a-nav-button reset-button" onClick={handleReset}>
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
      <div className="ex-chart">
        <div className="a-explanation">
          <div className="a-ex-des">설명</div>
          {results[currentProblem]?.explanation}
        </div>
        <div className="a-chart">
          <ChartResult allresults={allresults}/>
        </div>
      </div>
    </div>
  );
}

export default Answer;
