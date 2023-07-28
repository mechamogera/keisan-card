import React, { useEffect, useState } from 'react';
import './keisan.css';

function Keisan({resultRange, 
                operation, 
                nextValueProc}: { resultRange: number[], 
                              operation: string, 
                              nextValueProc: (beforeNum1:number, beforNum2:number) => { num1:number, num2:number }}) {

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
    const nextVal = nextValueProc(numFirst, numSecound);
    const nextNum1 = nextVal.num1;
    const nextNum2 = nextVal.num2;
    setNumFirst(nextNum1);
    setNumSecound(nextNum2);
    setResult(getResult(nextNum1, nextNum2, operation));
    setMessage("わかるかな");
    setNumQuestion((prevNum) =>prevNum + 1);
    const uttr = new SpeechSynthesisUtterance(`${nextNum1} ${getReading(operation)} ${nextNum2} わ？`);
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
      List.push(<button key={i} onClick={ onClick } disabled={disableButton}>{i}</button>);
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