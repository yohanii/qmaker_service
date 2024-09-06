import React, { useState, useEffect } from 'react';
import './QuizContents.css';

function QuizContents({ problem, problemIndex, onAnswerSubmit }) {
  const answerLabels = ['A', 'B', 'C', 'D'];

  // 선택된 답변을 추적하기 위한 상태
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // 이전에 저장된 답이 있을 경우 그 답을 상태에 반영
  useEffect(() => {
    const savedAnswers = JSON.parse(sessionStorage.getItem('answers')) || [];
    setSelectedAnswer(savedAnswers[problemIndex]);
  }, [problemIndex]);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    onAnswerSubmit(problemIndex, answerIndex); // 부모 컴포넌트에 답변 전달
  };

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="quiz-container">
      <div className="question-header">
        <div className="question-idx">Question {problemIndex + 1}</div>
        <div className="question">{problem.question}</div>
      </div>
      <ul className="options">
        {problem.options.map((option, index) => (
          <li
            key={index}
            className={`option-item ${
              index === selectedAnswer ? 'selected' : ''
            }`} // 선택된 답변에만 selected 클래스 적용
            onClick={() => handleAnswerClick(index)}
          >
            <span className="option-label">{answerLabels[index]}</span>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizContents;
