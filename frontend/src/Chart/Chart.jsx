import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Chart() {
    const [categories, setCategories] = useState([]);
    const [score, setScore] = useState([]);
    const [scoreTotal, setScoreTotal] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const chartInfo = JSON.parse(sessionStorage.getItem('storedAnswers')) || [];
        setCategories(chartInfo.categories);
        setScore(chartInfo.score);
        setScoreTotal(chartInfo.scoreTotal);
        console.log(score, scoreTotal, categories);
    }, [])




}

export default Chart;