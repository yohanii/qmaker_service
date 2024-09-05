import React, { useState, useEffect } from "react";
import "./QuizContents.css"

function QuizContents({ answers, problemIndex, onAnswerSubmit }) {
    const [problem, setProblem] = useState(null);

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
        <div>
            <div className="question-idx">{problemIndex+1}</div>
            <div className="question">{problem.question}</div>
            <ul className="options">
                {problem.options.map((option, index) => (
                    <label>
                        <li key={index}>
                        <input
                            type="radio"
                            name={`problem_${problemIndex}`}
                            checked={index === answers[problemIndex]}
                            onChange={() => handleAnswerClick(index)} 
                        />
                        {option}
                        </li>
                    </label>
                ))}
            </ul>
        </div>
    );
}

export default QuizContents;
