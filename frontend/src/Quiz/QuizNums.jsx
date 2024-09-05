import React from "react";
import './QuizNums.css';

function QuizNums({ onProblemSelect }) {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <>
            <div className="guide">문제를 선택하세요</div>
            <div className="nums-container">
            {numbers.map((num, index) => (
                <button 
                    key={index} 
                    className="num-button" 
                    onClick={() => onProblemSelect(index)}>
                    {num}
                </button>
            ))}
            </div>
        </>
    );
}

export default QuizNums;