import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStopwatch } from "react-timer-hook";
import './keisan.css';

import volumeIcon from './volumeicon.svg';
import volumeoffIcon from './volumeofficon.svg';
import refreshIcon from './refreshicon.svg';

import { useCookies } from 'react-cookie';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

  function displayAlert(title:string, message:string, onOk:() => void) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div id="react-confirm-alert">
            <div className="react-confirm-alert-overlay">
              <div className="react-confirm-alert">
                <div className="react-confirm-alert-body-custom">
                  <h1>{title}</h1>
                  {message}
                  <div className="react-confirm-alert-button-group-custom">
                    <button onClick={onOk}>はい</button>
                    <button onClick={onClose}>いいえ</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    });
  }


  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const [numFirst, setNumFirst] = useState(0);
  const [numSecound, setNumSecound] = useState(0);
  const [numQuestion, setNumQuestion] = useState(0);
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [resultNumber, setResultNumber] = useState<number|null>(null);

  const [cookies, setCookie, removeCookie] = useCookies(["nospeech"]);

  const [nospeech, setNospeech] = useState<boolean>(
    query.get("nospeech") ? 
      !!query.get("nospeech") : 
      cookies.nospeech === "true");

  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: true });


  function nextQuestion() {
    if (numQuestion >= listSize) {
      setMessage("おわり");
      pause();
      return;
    }

    const nextVal = nextValueProc(numFirst, numSecound);
    const nextNum1 = nextVal.num1;
    const nextNum2 = nextVal.num2;
    setNumFirst(nextNum1);
    setNumSecound(nextNum2);
    setResult(getResult(nextNum1, nextNum2, operation));
    setMessage(`${numQuestion + 1}/${listSize}もんめ わかるかな`);
    setNumQuestion((prevNum) =>prevNum + 1);
    setDisableButton(false);
    setResultNumber(null);
    if (!nospeech) {
      const uttr = new SpeechSynthesisUtterance(`${nextNum1} ${getReading(operation)} ${nextNum2} わ？`);
      speechSynthesis.speak(uttr);
    }
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
      setResultNumber(result);
      if (!nospeech) {
        const uttr = new SpeechSynthesisUtterance(`せいかい`);
        uttr.onend = () => {
          nextQuestion();
        }
        speechSynthesis.speak(uttr);
      } else {
        nextQuestion();
      }
    }
    else {
      setMessage("ふせいかい");
      if (!nospeech) {
        const uttr = new SpeechSynthesisUtterance(`まちがい`);
        speechSynthesis.speak(uttr);
      }
    }
  }

  const SpeakerClick = () => {
    setNospeech((prevVal) => { 
      setCookie("nospeech", !prevVal);
      console.log("set", !prevVal);
      return !prevVal; 
    });
  }

  const RefreshClick = () => {
    displayAlert("かくにん", "さいしょからやりなおしますか？", () => { window.location.reload(); });
  }

  const Results = () => {
    const List = [];
    for (let i = resultRange[0]; i <= resultRange[1]; i++) {
      List.push(<button className={resultNumber === i ? "ResultButton Push" : "ResultButton"} key={i} onClick={ onClick } disabled={disableButton}>{i}</button>);
    }
    return List;
  }

  return (
    <div className="Minus">
      <div className="Header">
        <div title="経過時間"
          className="Timer">
          <span>{('00' + minutes).slice(-2)}</span>:<span>{('00' + seconds).slice(-2)}</span>
        </div>
        <div className="Settings">
          <button className="Speaker"
            style={{ backgroundImage: `url(${nospeech ? volumeoffIcon : volumeIcon})`}} 
            onClick={ SpeakerClick } 
            title="音声の有り無しの切り替え">
          </button>

          <button className="Refresh" 
            style={{ backgroundImage: `url(${refreshIcon})` }} 
            onClick={ RefreshClick } 
            title="最初からやり直す">
          </button>
        </div>
      </div>
      <div className="Message"
        title="メッセージ">
        <p>{message}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        viewBox="0 0 143 67"
        xmlSpace="preserve"
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
            <text xmlSpace="preserve" font-size="31" font-style="normal" font-weight="normal" line-height="1" id="txt"><tspan x="-48.4904785156" y="11.25334">
              {('  ' + numFirst).slice(-2)} {operation} {(numSecound)}
            </tspan></text>
        </g>
      </svg>
      <div className="Result">
        {Results()}
      </div>
    </div>
  );
}

export default Keisan;