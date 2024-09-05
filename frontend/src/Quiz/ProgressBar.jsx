import React from "react";
import "./ProgressBar.css";

function ProgressBar({ solvedCount }) {
    console.log(solvedCount);
    const progressPercentage = (solvedCount / 10) * 100;

    return (
        <div className="progress-container">
            <div 
                className="progress-bar" 
                style={{ width: `${progressPercentage}%` }}>
            </div>
        </div>
    );
}

export default ProgressBar;
