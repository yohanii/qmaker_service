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
    <div className="quiz-container">
      <div className="question-header">
        <div className="question-idx">Question {problemIndex + 1}</div>
        <div className="question">{problem.question}</div>
      </div>
      <ul className="options">
        {problem.options.map((option, index) => (
          <li
            key={index}
            className={`option-item 
                            ${index === userAnswer ? 'user-selected' : ''}
                            ${index === correctAnswer ? 'correct' : ''}
                            ${
                              index === userAnswer && index !== correctAnswer
                                ? 'incorrect'
                                : ''
                            }`}
          >
            <span className="option-label">{answerLabels[index]}</span>
            {option}
            {index === userAnswer && index === correctAnswer && (
              <CheckCircle className="icon correct" />
            )}
            {index === userAnswer && index !== correctAnswer && (
              <XCircle className="icon incorrect" />
            )}
            {index === correctAnswer && index !== userAnswer && (
              <CheckCircle className="icon correct" />
            )}
          </li>
        ))}
      </ul>
      <div className="answer-summary">
        <p>
          Your answer:{' '}
          {userAnswer !== -1 ? answerLabels[userAnswer] : 'Not answered'}
        </p>
        <p>Correct answer: {answerLabels[correctAnswer]}</p>
      </div>
      <div className="explanation">
        <h3>설명</h3>
        <p>{result.explanation}</p>
      </div>
    </div>
  );
}

export default AnswerContent;
