import './Mainpage.css';

export default function Mainpage() {

    const GotoProblemPage = () => {

    }

  return (
    <>
      <h1 className="main-text">요약 노트를 입력해주세요!</h1>
      <textarea className="note-area"></textarea>
      <button onClick={GotoProblemPage} className="makeBtn">
        <div className='makeText'>문제 만들기</div>
      </button>
    </>
  );
}
