import React, { useEffect, useState } from 'react';
import './keisan.css';

function Keisan({resultRange, 
                operation, 
                num1Range,
                num2Range}: { resultRange: number[], 
                              operation: string, 
                              num1Range: number[],
                              num2Range: (num1:number) => number[]}) {
  function getRandomInt(min:number, max:number) {
    const minx = Math.ceil(min);
    const maxx = Math.floor(max + 1);
    return Math.floor(Math.random() * (maxx - minx) + minx);
  }

  function getReading(operation: string) : string {
    switch(operation) {
      case "+":
        return "ぷらす";
      case "-":
        return "まいなす";
      case "*":
        return "かける";
      default:
        return "わる"
    }
  }

  function getResult(num1:number, num2:number, operation: string) : number {
    switch(operation) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "*":
        return num1 * num2;
      default:
        return num1 / num2;
    }
  }

  const [numFirst, setNumFirst] = useState(0);
  const [numSecound, setNumSecound] = useState(0);
  const [numQuestion, setNumQuestion] = useState(0);
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  
  function nextQuestion() {
    const nextNum1 = getRandomInt(num1Range[0], num1Range[1]);
    const nextNum2Range = num2Range(nextNum1);
    const nextNum2 = getRandomInt(nextNum2Range[0], nextNum2Range[1])
    setNumFirst(nextNum1);
    setNumSecound(nextNum2);
    setResult(getResult(nextNum1, nextNum2, operation));
    setMessage("わかるかな");
    setNumQuestion((prevNum) =>prevNum + 1);
    const uttr = new SpeechSynthesisUtterance(`${nextNum1} ${getReading(operation)} ${nextNum2} は？`);
    setDisableButton(false);
    speechSynthesis.speak(uttr);
  }

  useEffect(() => {
    nextQuestion();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onClick(e: React.MouseEvent<HTMLElement>) {
    const myresult = Number(e.currentTarget.textContent);
    if (result === myresult) {
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

  const Results = () => {
    const List = [];
    for (let i = resultRange[0]; i <= resultRange[1]; i++) {
      List.push(<button onClick={ onClick } disabled={disableButton}>{i}</button>);
    }
    return List;
  }


  return (
    <div className="Minus">
      <div className="Message">{numQuestion}もんめ {message}</div>
      <div className="Question">{numFirst} {operation} {numSecound} = ?</div>
      <div className="Result">
        {Results()}
      </div>
    </div>
  );
}

export default Keisan;