import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "./homepage/Home";
import Login from "./loginpage/Login";
import Signup from "./sign-up/Signup";
import Mainpage from "./mainpage/Mainpage";
import "./AppTransitions.css";
import Notedata from "./mainpage/Notedata";


function AnimatedRoutes({ noteData }) {
  const location = useLocation();
console.log("animated",noteData);
  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>
        <div className="route-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<Mainpage noteData={noteData} />}
            />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  const [noteData, setNoteData] = useState(new Notedata());

  return (
    <Router>
      <div className="App">
        <Notedata />
        <AnimatedRoutes noteData={noteData} />
      </div>
    </Router>
  );
}

export default App;
