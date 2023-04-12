import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./homepage/Home";
import Login from "./loginpage/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Home /></>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
