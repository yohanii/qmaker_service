import { React, useState, useEffect} from "react";
import './QuizNums.css';
import ProblemTestData, { ProblemTestDataSet } from "../TestDataSet/ProblemTestData";

function QuizNums({ currentProblem, onProblemSelect }) {
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    // sample 문제 데이터를 세션 스토리지에 저장
    useEffect(() => {
        sessionStorage.setItem('problemId', JSON.stringify(ProblemTestDataSet.problem_set_id));
        ProblemTestDataSet.problems.forEach((problem, index) => {
            sessionStorage.setItem(`problem_${index}`, JSON.stringify(problem));
        });
    }, []);


    return (
        <div className="nums-container">
            {numbers.map((num, index) => {
                const problemData = JSON.parse(sessionStorage.getItem(`problem_${index}`));
                const problemTitle = problemData?.question;
                const truncatedTitle = problemTitle && problemTitle.length > 10 ? problemTitle.slice(0, 10).trim() + '...' : problemTitle;

                const formattedNum = String(num).padStart(2, '0');

                const problemStatus = JSON.parse(sessionStorage.getItem('answers')) || Array(10).fill(-1);

                return (
                    <div className="button-container" key={index}>
                        <button 
                            className={`num-button ${index === currentProblem ? 'active' : ''}`}
                            onClick={() => onProblemSelect(index)}>
                            {formattedNum}. {truncatedTitle}
                        </button>
                        <div className={`status ${problemStatus[index] === -1 ? 'unsolved' : 'solved'}`}></div>
                    </div>
                );
            })}
        </div>
    );
}

export default QuizNums;

