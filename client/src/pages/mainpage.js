import '../assets/mainpage.css';
import Header from '../shared/Header'
import React, {useState} from 'react';
import SideNav from '../shared/SideNav'

function Mainpage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="mainpage">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito:wght@300&display=swap');
      </style>
      <Header />
    <SideNav isOpen={isNavOpen} toggleNav = {toggleNav} className="classmenu"/>
    <div className="note">
      testing
    </div>

    </div>
  );
}

export default Mainpage;
