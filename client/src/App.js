// Import required dependancies
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Landing from "./landing/Landing";
import Login from "./loginpage/Login";
import Signup from "./sign-up/Signup";
import Mainpage from "./mainpage/Mainpage";
import "./AppTransitions.css";

// Adds fading animation between pages
function AnimatedRoutes() {

  // gets page location
  const location = useLocation();

  return (
    <TransitionGroup>
      {/* Fading functionality */}
      <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>
        <div className="route-container">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Mainpage />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
