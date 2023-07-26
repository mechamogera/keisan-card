import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Minus from '../Minus';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="*" element={ <Minus /> } />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
