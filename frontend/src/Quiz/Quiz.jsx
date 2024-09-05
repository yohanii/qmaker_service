import React from "react";
import QuizNums from "./QuizNums";
import QuizContents from "./QuizContents";
import "./Quiz.css"

function Quiz() {
    return (
        <div className="width-container">
            <div className="sidebar"><QuizNums /></div>  
            <div className="quiz"><QuizContents /></div>  
        </div>
    )
}

export default Quiz;