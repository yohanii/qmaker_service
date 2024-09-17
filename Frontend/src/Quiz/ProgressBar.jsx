import React from "react";
import "./ProgressBar.css";

function ProgressBar({ solvedCount }) {
    const progressPercentage = (solvedCount / 10) * 100;

    return (
        <div className="progress-container">
            <div 
                className="progress-bar" 
                style={{ height: `${progressPercentage}%` }}>
            </div>
        </div>
    );
}

export default ProgressBar;