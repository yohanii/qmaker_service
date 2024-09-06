import React, { useState, useEffect } from "react";
import "./QuizContents.css";

function QuizContents({ answers, problemIndex, onAnswerSubmit }) {
    const [problem, setProblem] = useState(null);
    const answerLabels = ['A', 'B', 'C', 'D'];

    // 문제 데이터를 세션 스토리지에서 불러오기
    useEffect(() => {
        const storedProblem = sessionStorage.getItem(`problem_${problemIndex}`);
        setProblem(JSON.parse(storedProblem));
    }, [problemIndex]);

    // 문제 답 선택 시 처리
    const handleAnswerClick = (answer) => {
        onAnswerSubmit(problemIndex, answer);
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
                        className={`option-item ${index === answers[problemIndex] ? "selected" : ""}`}
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
