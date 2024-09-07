import React from 'react';
import './AnswerNums.css';

function AnswerNums({
  currentProblem,
  onProblemSelect,
  results,
  userAnswers,
  problemData,
}) {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="a-nums-container">
      {numbers.map((num, index) => {
        const problemDataItem = problemData ? problemData[index] : null;
        const problemTitle = problemDataItem?.question;
        const truncatedTitle =
          problemTitle && problemTitle.length > 10
            ? problemTitle.slice(0, 10).trim() + '...'
            : problemTitle;
        const formattedNum = String(num).padStart(2, '0');

        let statusClass = 'unsolved';
        if (results && userAnswers[index] !== undefined) {
          const correctAnswerIndex = results[index].answer;
          const userAnswer = userAnswers[index];
          statusClass =
            correctAnswerIndex === userAnswer ? 'correct' : 'incorrect';
        }

        return (
          <div
            className={`a-button-container ${
              index === currentProblem ? 'active' : ''
            }`}
            key={index}
            onClick={() => onProblemSelect(index)}
          >
            <button className="a-num-button">
              {formattedNum}. {truncatedTitle}
            </button>
            <div className={`a-status ${statusClass}`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default AnswerNums;
