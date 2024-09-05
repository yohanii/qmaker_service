import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage/Mainpage';
import Quiz from './Quiz/Quiz';
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Mainpage />}></Route>
      <Route path="quiz" element={<Quiz />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
