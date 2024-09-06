import React from 'react';
import './AnswerNums.css';

function AnswerNums({ currentProblem, onProblemSelect, results, userAnswers }) {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="nums-container">
      {numbers.map((num, index) => {
        const problemData = JSON.parse(
          sessionStorage.getItem(`problem_${index}`)
        );
        const problemTitle = problemData?.question;
        const truncatedTitle =
          problemTitle && problemTitle.length > 10
            ? problemTitle.slice(0, 10).trim() + '...'
            : problemTitle;
        const formattedNum = String(num).padStart(2, '0');

        let statusClass = 'unsolved';
        if (results && userAnswers[index] !== undefined) {
          const correctAnswer = results[index].answer - 1; // API는 1-based index를 사용하므로 0-based로 변환
          const userAnswer = userAnswers[index];
          statusClass = correctAnswer === userAnswer ? 'correct' : 'incorrect';
        }

        return (
          <div className="button-container" key={index}>
            <button
              className={`num-button ${
                index === currentProblem ? 'active' : ''
              }`}
              onClick={() => onProblemSelect(index)}
            >
              {formattedNum}. {truncatedTitle}
            </button>
            <div className={`status ${statusClass}`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default AnswerNums;