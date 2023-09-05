import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Keisan from '../Keisan';
import Select from '../Select';


function App() {
  function getRandomInt(min:number, max:number) {
    const minx = Math.ceil(min);
    const maxx = Math.floor(max);
    return Math.floor(Math.random() * (maxx - minx) + minx);
  }

  function makeMinusList() : {num1:number, num2:number}[] {
    const minusList:{ num1:number, num2:number }[] = []
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= i; j++) {
        minusList.push({num1: i, num2: j}); 
      }
    }
    return minusList;
  }
  const minusList = makeMinusList();

  function makePlusList() : {num1:number, num2:number}[] {
    const plusList:{ num1:number, num2:number }[] = []
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10 - i; j++) {
        plusList.push({num1: i, num2: j});
      }
    }
    return plusList;
  }
  const plusList = makePlusList();

  function makePlusMoveUpList() : {num1:number, num2:number}[] {
    const plusList: { num1:number, num2:number }[] = []
    for (let i = 2; i <= 9; i++) {
      for (let j = 11 - i; j <= 9; j++) {
        plusList.push({num1: i, num2: j});
      }
    }
    return plusList;
  }
  const plusMoveUpList = makePlusMoveUpList();

  function getNextValueProc(list: {num1:number, num2:number}[],
                            makeList: () => {num1:number, num2:number}[]) : 
    (beforNum1:number, beforeNum2:number) => { num1: number, num2: number } {
    return (beforeNum1:number, beforeNum2:number) => {
      if (list.length <= 0) {
        makeList().forEach((element) => {
          list.push(element);
        }); 
      }
      const idx = getRandomInt(0, list.length);
      return list.splice(idx, 1)[0];
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/keisan-card"
               element= { <Select /> } />
        <Route path="/keisan-card/plus" 
               element={ <Keisan resultRange={[0, 10]} 
                                operation="+"
                                listSize={plusList.length}
                                nextValueProc={getNextValueProc(plusList, makePlusList)} /> } />
        <Route path="/keisan-card/test" 
               element={ <Keisan resultRange={[0, 10]} 
                                operation="+"
                                listSize={3}
                                nextValueProc={() => { return {num1: 1, num2: 2} }} /> } />
        <Route path="/keisan-card/plus-moveup"
               element={ <Keisan resultRange={[11, 18]}
                                 operation="+"
                                 listSize={plusMoveUpList.length}
                                 nextValueProc={getNextValueProc(plusMoveUpList, makePlusMoveUpList)} /> } />
        <Route path="*" 
               element={ <Keisan resultRange={[0, 10]} 
                                operation="-"
                                listSize={minusList.length}
                                nextValueProc={getNextValueProc(minusList, makeMinusList)} /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
