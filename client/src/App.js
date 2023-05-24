import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from "./homepage/Home";
import Login from "./loginpage/Login";
import Signup from "./sign-up/Signup";
import Mainpage from "./mainpage/Mainpage";
<<<<<<< HEAD
=======
import Profile from "./profileSettingsPage/Profile";
>>>>>>> parent of 7956323 (creating cohesive profilesetting page and passing user as props)
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/userStore";
import ProtectedRoute from './protectedRoute/protectedroute';

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
<<<<<<< HEAD
            <Route path="/dashboard" element={<ProtectedRoute><Mainpage /></ProtectedRoute>} />
=======
            <Route path="/dashboard" element={<Mainpage />} />
            <Route path="/profile" element={<Profile />} />
>>>>>>> parent of 7956323 (creating cohesive profilesetting page and passing user as props)
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
