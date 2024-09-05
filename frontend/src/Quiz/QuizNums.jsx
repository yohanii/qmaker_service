import React from "react";
import './QuizNums.css';

function QuizNums({ currentProblem, onProblemSelect }) {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <>
            <div className="guide">Question List</div>
            <div className="nums-container">
                {numbers.map((num, index) => (
                    <button 
                        key={index} 
                        className={`num-button ${index === currentProblem ? 'active' : ''}`}
                        onClick={() => onProblemSelect(index)}>
                        {num}
                    </button>
                ))}
            </div>
        </>
    );
}

export default QuizNums;
