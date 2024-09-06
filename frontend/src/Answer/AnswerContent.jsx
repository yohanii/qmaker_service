import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import './AnswerContent.css';

function AnswerContent({ userAnswer, problemIndex, result }) {
  const [problem, setProblem] = useState(null);
  const answerLabels = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    const storedProblem = sessionStorage.getItem(`problem_${problemIndex}`);
    setProblem(JSON.parse(storedProblem));
    console.log(problem);
  }, [problemIndex]);

  if (!problem) return <div>Loading...</div>;

  const correctAnswer = result.answer - 1; // API 응답은 1-based index를 사용하므로 0-based로 변환

  return (
    <div className="a-quiz-container">
      <div className="a-question-header">
        <div className="a-question-idx">Question {problemIndex + 1}</div>
        <div className="a-question">{problem.question}</div>
      </div>
      <ul className="a-options">
        {problem.options.map((option, index) => (
          <li
            key={index}
            className={`a-option-item 
                            ${index === userAnswer ? 'user-selected' : ''}
                            ${index === correctAnswer ? 'correct' : ''}
                            ${
                              index === userAnswer && index !== correctAnswer
                                ? 'incorrect'
                                : ''
                            }`}
          >
            <span className="a-option-label">{answerLabels[index]}</span>
            {option}
            {index === userAnswer && index === correctAnswer && (
              <CheckCircle className="a-icon correct" />
            )}
            {index === userAnswer && index !== correctAnswer && (
              <XCircle className="a-icon incorrect" />
            )}
            {index === correctAnswer && index !== userAnswer && (
              <CheckCircle className="a-icon correct" />
            )}
          </li>
        ))}
      </ul>
      <div className="a-answer-summary">
        <p>
          Your answer:{' '}
          {userAnswer !== -1 ? answerLabels[userAnswer] : 'Not answered'}
        </p>
        <p>Correct answer: {answerLabels[correctAnswer]}</p>
      </div>
    </div>
  );
}

export default AnswerContent;
