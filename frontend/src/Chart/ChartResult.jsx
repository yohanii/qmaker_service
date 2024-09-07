import React, { useEffect, useState } from 'react';
import { ProblemCheckAnswer } from '../TestDataSet/ProblemCheckAnswer';
import Chart from 'react-apexcharts';
import './ChartResult.css';

function ChartResult({ allresults }) {
    const [categories, setCategories] = useState([]);
    const [scoreTotal, setScoreTotal] = useState(null);
    const [scoreList, setScoreList] = useState([]);
  
    useEffect(() => {
      const chartInfo = allresults;
  
      setCategories(chartInfo.categories || []);
      setScoreTotal(chartInfo.scoreTotal || 0);
  
      // score 객체를 가져옴
      const scoreObjs = chartInfo.score;
  
      // 카테고리 순서대로 점수를 배열로 변환
      const tempScoreList = chartInfo.categories.map(
        (category) => scoreObjs[category] || 0
      );
  
      setScoreList(tempScoreList);
    }, [allresults]);
  

  const options = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
      fontWeight: 600,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'radial',
        shadeIntensity: 1,
        gradientToColors: ['#17d1fd'], // 종료 색상
        inverseColors: false,
        opacityFrom: 0.8, // 시작 불투명
        opacityTo: 0.5, // 종료 불투명도
        stops: [0, 100], // 그라데이션 멈추는 지점
      },
    },
    stroke: {
      show: true,
      width: 2,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
      },
    },
    yaxis: {
      show: false,
      fontWeight: 50,
      min: -5,
      max: 100,
      tickAmount: 5,
    },
    colors: ['#1c39cd'],
  };

  // Series data for the chart
  const series = [
    {
      name: 'Scores',
      data: scoreList, // Set the scoreList from state
    },
  ];

  return (
    <>
      <div className="c-description">문항 카테고리별 정답률</div>
      <div className="chart">
        <Chart options={options} series={series} type="radar" height={350} />
      </div>
      <div className="score-total">Your score: {scoreTotal}/10</div>
      <div className="description">* %로 표현한 결과입니다</div>
    </>
  );
}

export default ChartResult;
