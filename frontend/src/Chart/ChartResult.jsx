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

        let tempScoreList = [];
        for (let i = 0; i < chartInfo.categories.length; i++) {
            tempScoreList.push(score[categories[i]] || 0);
        }
        setScoreList(tempScoreList);
        console.log(tempScoreList);
    }, []);

    console.log("Score List: ", scoreList);

    const options = {
        chart: {
            type: 'radar',
            toolbar: {
                show: false
            }
        },
        xaxis: {
            categories: categories
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

    const series = [{
        name: "Scores",
        data: scoreList
    }];

    return (
        <>
            <div className="chart">
                <Chart
                    options={options}
                    series={series} 
                    type="radar"
                    height={350}
                />
            </div>
            <div className="description">
                * %로 표현한 결과입니다.
            </div>
            <div className="score-total">
                {scoreTotal}/10
            </div>
            
        </>
    );
}

export default ChartResult;
