import './Mainpage.css';
import { Link } from 'react-router-dom';

export default function Mainpage() {
  const GotoProblemPage = () => {};

  return (
    <>
      <h1 className="main-text">요약 노트를 입력해주세요!</h1>
      <textarea className="note-area"></textarea>
      <button onClick={GotoProblemPage} className="makeBtn">
        <Link to="quiz" className="quiz-link">
          <div className="makeText">문제 만들기</div>
        </Link>
      </button>
    </>
  );
}
