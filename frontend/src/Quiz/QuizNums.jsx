import React from "react";
import './QuizNums.css';

function QuizNums({ currentProblem, onProblemSelect }) {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <>
            <div className="nums-container">
                {numbers.map((num, index) => {
                    const problemData = JSON.parse(sessionStorage.getItem(`problem_${index}`));
                    const problemTitle = problemData?.question;
                    const truncatedTitle = problemTitle.length > 5 ? problemTitle.slice(0, 5).trim() + '...' : problemTitle;

                    const formattedNum = String(num).padStart(2, '0');

                    return (
                        <button 
                            key={index} 
                            className={`num-button ${index === currentProblem ? 'active' : ''}`}
                            onClick={() => onProblemSelect(index)}>
                            {formattedNum}. {truncatedTitle}
                        </button>
                    );
                })}
            </div>
        </>
    );
}

export default QuizNums;
