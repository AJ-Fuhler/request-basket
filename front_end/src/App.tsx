import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";  
import Home from './components/Home';
import Basket from './components/Basket';
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/baskets/:url" element={<Basket />} />
        </Routes>
      </BrowserRouter>
      
      {/* 
      // <BrowserRouter>
      //   <Link to="/" style={{padding:"5px"}}>Home</Link>
      //   <Link to="/about" style={{padding:"5px"}}>About</Link>
      //   <Link to="/faq" style={{padding:"5px"}}>FAQ</Link>

      // <Routes>
      //   <Route path="/" element={<Home />}/>
      //   <Route path="/about" element={<About/>}/>
      //   <Route path="/faq" element={<FAQ />}/>
      // </Routes>

      // <em>I persist on every route.</em>
      // </BrowserRouter> */}
    </>
  )
}

export default App
