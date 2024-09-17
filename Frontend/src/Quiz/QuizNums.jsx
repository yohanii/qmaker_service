import React from 'react';
import './QuizNums.css';

function QuizNums({ currentProblem, onProblemSelect, problems }) {
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  console.log(problems);

  return (
    <div className="nums-container">
      {numbers.map((num, index) => {
        const problemDataItem = problems ? problems[index] : null;
        const problemTitle = problemDataItem?.question;
        const truncatedTitle =
          problemTitle && problemTitle.length > 10
            ? problemTitle.slice(0, 10).trim() + '...'
            : problemTitle;

        const formattedNum = String(num).padStart(2, '0');

        const problemStatus =
          JSON.parse(sessionStorage.getItem('answers')) || Array(10).fill(-1);

        return (
          <div
            className={`button-container ${
              index === currentProblem ? 'active' : ''
            }`}
            key={index}
            onClick={() => onProblemSelect(index)}
          >
            <button className="num-button">
              {formattedNum}. {truncatedTitle}
            </button>
            <div
              className={`status ${
                problemStatus[index] === -1 ? 'unsolved' : 'solved'
              }`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}

export default QuizNums;
