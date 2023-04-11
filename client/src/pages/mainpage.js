import '../assets/mainpage.css';
import Header from '../shared/Header'
import React, {useState} from 'react';
import SideNav from '../shared/SideNav'

function Mainpage() {
  //**test class data */
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Class 1',
      subnotes: [
        { id: 1, title: 'Subnote 1' },
        { id: 2, title: 'Subnote 2' },
        // Add more subnotes as needed
      ],
    },
    {
      id: 2,
      name: 'Class 2',
      subnotes: [
        { id: 1, title: 'Subnote 1' },
        { id: 2, title: 'Subnote 2' },
        // Add more subnotes as needed
      ],
    }
  ])

  const [isNavOpen, setIsNavOpen] = useState(true);

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
    <SideNav isOpen={isNavOpen} toggleNav = {toggleNav} classes={classes} className="classmenu"/>
    <div className="note">
      testing
    </div>

    </div>
  );
}

export default Mainpage;
