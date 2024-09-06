import React, { useEffect, useState } from "react";
import { ProblemCheckAnswer } from '../TestDataSet/ProblemCheckAnswer';
import Chart from "react-apexcharts";
import './ChartResult.css';

function ChartResult() {
    const [categories, setCategories] = useState([]);
    const [score, setScore] = useState([]);
    const [scoreTotal, setScoreTotal] = useState(null);
    const [scoreList, setScoreList] = useState([]);

    useEffect(() => {
        const chartInfo = ProblemCheckAnswer;
    
        setCategories(chartInfo.categories || []);
        setScore(chartInfo.score || []);
        setScoreTotal(chartInfo.scoreTotal || 0);
    
        // sessionStorage에서 scoreObj를 가져옴
        const scoreObjs = JSON.parse(sessionStorage.getItem('scoreObj'));
        
        let tempScoreList = sessionStorage.getItem('myScore');
        
        if (!tempScoreList && scoreObjs) {
            tempScoreList = [];
    
            // 카테고리 순서대로 scoreObj의 값을 추출하여 배열로 변환
            chartInfo.categories.forEach((category) => {
                tempScoreList.push(scoreObjs[category] || 0);  // 카테고리 순서대로 값을 가져옴
            });
    
            sessionStorage.setItem('myScore', JSON.stringify(tempScoreList)); 
        } else {
            tempScoreList = JSON.parse(tempScoreList);
        }
    
        setScoreList(tempScoreList);
    }, []);
    
    

    console.log("ssss",scoreList);

    const options = {
        chart: {
            type: 'radar',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: categories // Set the categories from state
        },
        fill: {
            opacity: 0.5
        },
        stroke: {
            show: true,
            width: 2
        },
        markers: {
            size: 0,
            hover: {
                size: 5
            }
        },
        yaxis: {
            show: true,
            min: 0,
            max: 100,
            tickAmount: 5
        }
    };

    // Series data for the chart
    const series = [{
        name: "Scores",
        data: scoreList // Set the scoreList from state
    }];

    return (
        <>
            <div className="c-description">문항 카테고리별 정답률</div>
            <div className="chart">
                <Chart
                    options={options}
                    series={series}
                    type="radar"
                    height={250}
                />
            </div>
            <div className="score-total">
                Your score: {scoreTotal}/10
            </div>
            <div className="description">
                * %로 표현한 결과입니다
            </div>
        </>
    );
}

export default ChartResult;
