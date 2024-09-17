// TextReveal.js
import React, { useEffect, useState } from 'react';
import './Mainpage.css'

const TextReveal = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [looping, setLooping] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayedText('');
      setIsComplete(true);
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index + 1 >= text.length) {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);


  

  return (
    <span className='spans'>
      {displayedText}
      {isComplete && displayedText === text && '!'}
    </span>
  );
};

export default TextReveal;
