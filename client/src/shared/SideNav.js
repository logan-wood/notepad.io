import React from 'react';

const SideNav = ({isOpen, toggleNav}) => {
    return (

        <div className={`sidenav ${isOpen ? 'open' : ''}`}>
           {
           <button onClick={toggleNav} className="navButton">test</button>/** put in the content for the side navigation here later */} 
        </div>
        );  
};

export default SideNav;