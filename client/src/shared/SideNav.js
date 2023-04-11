import React from "react";
import arrow from "./lefticon.png";

const SideNav = ({ isOpen, toggleNav, classes }) => {
  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <button onClick={toggleNav} className="navButton">
        <img src={arrow}></img>
      </button>
      <div>
        <h1>My Classes</h1>
        <hr></hr>
        <div className="classDiv">
          {classes.map((classItem) => (
            <div key={classItem.id}>
              <h3>{classItem.name}</h3>
              <ul>
                {classItem.subnotes.map((subnote) => (
                  <li key={subnote.id}>{subnote.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="sideNavButtonDiv" >
        <button className="yellowbutton">+ new class</button>
      </div>
    </div>
  );
};

export default SideNav;
