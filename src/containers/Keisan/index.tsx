import React, { useEffect, useState } from 'react';
import './keisan.css';

function Keisan({resultRange, 
                operation, 
                listSize,
                nextValueProc}: { resultRange: number[], 
                              operation: string, 
                              listSize: number,
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
      <div className="Message">{numQuestion}/{listSize}もんめ {message}</div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 143 67" xmlSpace="preserve"
      className="Svg">
        <desc>Created with Fabric.js 5.3.0</desc>
        <defs>
        </defs>
        <g transform="matrix(1 0 0 1 71.399839099 33.216879686)" id="pC9xTmbnF08ShyWQyhTOu"  >
        <path id="path1" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -63.95817 26.34755 L -63.95817 -26.347540000000002 L 48.27031 -26.347540000000002 L 63.95816 -12.268700000000003 L 63.95816 26.34755 z" stroke-linecap="round" />
        </g>
        <g transform="matrix(0.6674346462 0 0 0.6674346462 22.8450079881 33.216879686)" id="ds_CRH4EIXnDdjH3cn4ez"  >
        <path id="path2" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M 0 -8.04505 C 4.44087 -8.04505 8.04505 -4.44087 8.04505 0 C 8.04505 4.44087 4.44087 8.04505 0 8.04505 C -4.44087 8.04505 -8.04505 4.44087 -8.04505 0 C -8.04505 -4.44087 -4.44087 -8.04505 0 -8.04505 z" stroke-linecap="round" />
        </g>
        <g transform="matrix(1 0 0 1 82.2328910304 33.216879686)"  id="DGg7km4RwZXg7n7ySh3Dw">
            <text xmlSpace="preserve" font-family="Open Sans" font-size="31" font-style="normal" font-weight="normal" line-height="1" id="txt"><tspan x="-48.4904785156" y="11.25334">{numFirst} {operation} {numSecound}</tspan></text>
        </g>
      </svg>
      <div className="Result">
        {Results()}
      </div>
    </div>
  );
}

export default Keisan;