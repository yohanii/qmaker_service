import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from './MainLayout';
import Quiz from './Quiz'; 
import Answer from './Answer'; 
import Input from './Input';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="input" element={<Input />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="answer" element={<Answer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
