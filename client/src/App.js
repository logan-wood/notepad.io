import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from "./homepage/Home";
import Login from "./loginpage/Login";
import Signup from "./sign-up/Signup";
import Mainpage from "./mainpage/Mainpage";
import "./AppTransitions.css";
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/userStore";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={1000}>
        <div className="route-container">
          <Routes>
            <Route path="/" element={<Home />} />
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <AnimatedRoutes />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
