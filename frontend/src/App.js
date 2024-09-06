import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage/Mainpage';
import Header from './Layout/Header';
import Quiz from './Quiz/Quiz';
import Answer from './Answer/answer';
import ChartResult from './Chart/ChartResult';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Mainpage />}></Route>
      <Route path="quiz" element={<Quiz />}></Route>
      <Route path="answer" element={<Answer />}></Route>
      <Route path="chart" element={<ChartResult />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;