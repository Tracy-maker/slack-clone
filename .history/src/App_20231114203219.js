import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Chat}from'./components/Chat/Chat'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Chat/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
