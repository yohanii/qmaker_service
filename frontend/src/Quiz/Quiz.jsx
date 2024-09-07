import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizNums from './QuizNums';
import QuizContents from './QuizContents';
import ProgressBar from './ProgressBar';
import './Quiz.css';

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const problemData = location.state?.problemData;

  // 현재 선택한 문제 상태를 세션 스토리지에서 가져오거나 기본값 0으로 설정
  const [currentProblem, setCurrentProblem] = useState(
    parseInt(sessionStorage.getItem('currentProblem')) || 0
  );

  // 문제 상태 배열 관리
  const [problemStates, setProblemStates] = useState(
    JSON.parse(sessionStorage.getItem('answers')) || Array(10).fill(-1)
  );
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    storeProblems();
  }, [problemData]);

  // 문제 상태가 변경될 때마다 해결된 문제의 개수를 카운팅
  useEffect(() => {
    setSolvedCount(problemStates.filter((state) => state !== -1).length);
  }, [problemStates]);

  // 현재 문제 상태가 변경될 때 세션 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem('currentProblem', currentProblem);
  }, [currentProblem]);

  // 문제 선택 시 현재 문제 상태 업데이트
  const handleProblemSelect = (index) => {
    setCurrentProblem(index); // 상태 업데이트
    sessionStorage.setItem('currentProblem', index); // 세션 스토리지에 저장
  };

  const storeProblems = () => {
    sessionStorage.setItem('problemData', JSON.stringify(problemData));
  };

  // 답 선택 시 문제 상태 업데이트
  const handleAnswerSubmit = (index, answer) => {
    const updatedStates = [...problemStates];
    updatedStates[index] = answer;
    setProblemStates(updatedStates);
    sessionStorage.setItem('answers', JSON.stringify(updatedStates));
  };

  // 다음 문제
  const handleNext = () => {
    if (currentProblem < 9) {
      const nextProblem = currentProblem + 1;
      setCurrentProblem(nextProblem);
      sessionStorage.setItem('currentProblem', nextProblem); // 세션 스토리지에 저장
    }
  };

  // 이전 문제
  const handlePrev = () => {
    if (currentProblem > 0) {
      const prevProblem = currentProblem - 1;
      setCurrentProblem(prevProblem);
      sessionStorage.setItem('currentProblem', prevProblem); // 세션 스토리지에 저장
    }
  };

  // 모든 문제를 다 풀었는지 확인
  const allSolved = problemStates.every((state) => state !== -1);

  // 제출하기 버튼 클릭 시 answer 페이지로 이동
  const handleSubmit = () => {
    sessionStorage.setItem('problemId', problemData.id);
    sessionStorage.setItem('problemdata', problemData);
    navigate('/answer', { state: { problemData: problemData } });
  };

  return (
    <>
      <div className="width-container">
        <div className="progress-wrapper">
          <ProgressBar solvedCount={solvedCount} />
        </div>
        <div className="sidebar">
          <QuizNums
            currentProblem={currentProblem}
            onProblemSelect={handleProblemSelect}
            problems={problemData.problems || []}
          />
        </div>
        <div className="quiz">
          {currentProblem !== null && (
            <>
              <div className="quiz-contents">
                <QuizContents
                  answers={problemStates}
                  problemIndex={currentProblem}
                  problem={problemData?.problems[currentProblem] || {}}
                  onAnswerSubmit={handleAnswerSubmit}
                />
              </div>
              <div className="navigation-buttons">
                <button
                  className="nav-button prev-button"
                  onClick={handlePrev}
                  disabled={currentProblem === 0}
                >
                  ←
                </button>
                {/* 모든 문제를 풀었을 때 제출하기 버튼 표시 */}
                {allSolved && (
                  <button
                    className="nav-button submit-button"
                    onClick={handleSubmit}
                    style={{ margin: '0 10px' }}
                  >
                    제출하기
                  </button>
                )}
                <button
                  className="nav-button next-button"
                  onClick={handleNext}
                  disabled={currentProblem === 9}
                >
                  →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Quiz;
