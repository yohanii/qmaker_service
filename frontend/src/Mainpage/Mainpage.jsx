import './Mainpage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { SendNoteData } from '../util/http';
import Spinner from './score.gif';
import LoadingBar from './LoadingBar';
import TextReveal from './TextReveal';

export default function Mainpage() {
  const [textValue, setTextValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function SendTextData() {
    setIsLoading(true);
    try {
      const ProblemData = await SendNoteData(textValue);
      if (ProblemData) {
        navigate('/quiz', { state: { problemData: ProblemData } });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const handleSetTab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      let val = e.target.value;
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = val.substring(0, start) + '\t' + val.substring(end);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      handleSetValue(e);
      return false;
    }
  };

  return (
    <div className="Mainbody">
      {isLoading && (
        <>
          <div className="spinner">
            <img src={Spinner} alt="Loading..." />
          </div>
          <div className="loading-container">
            <TextReveal text="문 제 생성 중 입니다..." />{' '}
            {/* TextReveal 컴포넌트 */}
            <LoadingBar /> {/* 로딩 바 컴포넌트 */}
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <h1 className="main-text">
            요약 노트를 입력해주세요!
            <img
              src="/Images/pencliImg.png"
              alt="pencli"
              className="PencliImg"
            />
          </h1>
          <div className="notebook">
            <div className="notebook-line"></div>
            <textarea
              className="note-area"
              value={textValue}
              onChange={handleSetValue}
              onKeyDown={handleSetTab}
              placeholder="여기에 요약 노트를 작성하세요..."
              maxLength={5000}
            ></textarea>
          </div>
          <div className="char-count">{textValue.length} / 5000</div>
          <button
            className="makeBtn"
            onClick={SendTextData}
            disabled={isLoading}
          >
            <div className="makeText">문제 만들기</div>
          </button>
        </>
      )}
    </div>
  );
}
