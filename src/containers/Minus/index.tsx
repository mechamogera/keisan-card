import React, { useEffect, useState } from 'react';
import './Minus.css';

function Minus() {
  function getRandomInt(min:number, max:number) {
    const minx = Math.ceil(min);
    const maxx = Math.floor(max + 1);
    return Math.floor(Math.random() * (maxx - minx) + minx);
  }

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const [numFirst, setNumFirst] = useState(0);
  const [numSecound, setNumSecound] = useState(0);
  const [numQuestion, setNumQuestion] = useState(0);
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  
  useEffect(() => {
    nextQuestion();
  }, []);

  function nextQuestion() {
    const nextNum1 = getRandomInt(0, 10);
    const nextNum2 = getRandomInt(0, nextNum1)
    setNumFirst(nextNum1);
    setNumSecound(nextNum2);
    setResult(nextNum1 - nextNum2);
    setMessage("わかるかな");
    setNumQuestion((prevNum) =>prevNum + 1);
    const uttr = new SpeechSynthesisUtterance(`${nextNum1} まいなす ${nextNum2} は？`);
    setDisableButton(false);
    speechSynthesis.speak(uttr);
  }

  async function onClick(e: React.MouseEvent<HTMLElement>) {
    const myresult = Number(e.currentTarget.textContent);
    if (result == myresult) {
      setDisableButton(true);
      setMessage("せいかい");
      const uttr = new SpeechSynthesisUtterance(`せいかい`);
      uttr.onend = () => {
        nextQuestion();
      }
      speechSynthesis.speak(uttr);      
    }
    else {
      setMessage("ふせいかい")
      const uttr = new SpeechSynthesisUtterance(`まちがい`);
      speechSynthesis.speak(uttr);
    }
  }


  return (
    <div className="Minus">
      <div className="Message">{numQuestion}もんめ {message}</div>
      <div className="Question">{numFirst} - {numSecound} = ?</div>
      <div className="Result">
        <button onClick={ onClick } disabled={disableButton}>0</button>
        <button onClick={ onClick } disabled={disableButton}>1</button>
        <button onClick={ onClick } disabled={disableButton}>2</button>
        <button onClick={ onClick } disabled={disableButton}>3</button>
        <button onClick={ onClick } disabled={disableButton}>4</button>
        <button onClick={ onClick } disabled={disableButton}>5</button>
        <button onClick={ onClick } disabled={disableButton}>6</button>
        <button onClick={ onClick } disabled={disableButton}>7</button>
        <button onClick={ onClick } disabled={disableButton}>8</button>
        <button onClick={ onClick } disabled={disableButton}>9</button>
        <button onClick={ onClick } disabled={disableButton}>10</button>
      </div>
    </div>
  );
}

export default Minus;