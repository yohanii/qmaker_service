import React, { useState, useEffect } from "react";

function QuizContents({ answers, problemIndex, onAnswerSubmit }) {

    //answer==> appcontext?
    
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
            <div className="question">{problem.question}</div>
            <ul>
                {problem.options.map((option, index) => (
                    <li key={index}>
                        <input
                            type="radio"
                            name={`problem_${problemIndex}`}
                            checked={index === answers[problemIndex]}
                            onClick={() => handleAnswerClick(index)}
                        />
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizContents;
