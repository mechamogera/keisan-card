import React, { useEffect, useState } from 'react';
import './Minus.css';

function Minus() {
  function getRandomInt(min:number, max:number) {
    const minx = Math.ceil(min);
    const maxx = Math.floor(max + 1);
    return Math.floor(Math.random() * (maxx - minx) + minx);
  }

  const [numFirst, setNumFirst] = useState(getRandomInt(0, 10));
  const [numSecound, setNumSecound] = useState(0);
  const [result, setResult] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setNumSecound(getRandomInt(0, numFirst));
  }, [numFirst]);

  useEffect(() => {
    setResult(numFirst - numSecound);
    setMessage("わかるかな")
  }, [numFirst, numSecound]);

  function onClick(e: React.MouseEvent<HTMLElement>) {
    const myresult = Number(e.currentTarget.textContent);
    if (result == myresult) {
      setMessage("せいかい")
      setNumFirst(getRandomInt(0, 10));
    }
    else {
      setMessage("ふせいかい")
    }

  }


  return (
    <div className="Minus">
      <div>{message}</div>
      <div>{numFirst} - {numSecound} = ?</div>
      <button onClick={ onClick }>0</button>
      <button onClick={ onClick }>1</button>
      <button onClick={ onClick }>2</button>
      <button onClick={ onClick }>3</button>
      <button onClick={ onClick }>4</button>
      <button onClick={ onClick }>5</button>
      <button onClick={ onClick }>6</button>
      <button onClick={ onClick }>7</button>
      <button onClick={ onClick }>8</button>
      <button onClick={ onClick }>9</button>
      <button onClick={ onClick }>10</button>
    </div>
  );
}

export default Minus;