import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Keisan from '../Keisan';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/keisan-card/plus" 
               element={ <Keisan resultRange={[0, 10]} 
                                operation="+" 
                                num1Range={[0, 10]}
                                num2Range={(num1: number) : number[] => { return [0, 10 - num1]; }} /> } />
        <Route path="*" 
               element={ <Keisan resultRange={[0, 10]} 
                                operation="-" 
                                num1Range={[0, 10]}
                                num2Range={(num1: number) : number[] => { return [0, num1]; }} /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
