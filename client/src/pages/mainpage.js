import '../assets/mainpage.css';
import notelo_red from '../assets/notelo_red.png';

function Mainpage() {
  return (
    <div className="mainpage">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Fjalla+One&family=Nunito:wght@300&display=swap');
      </style>
      <header className="mainpage_header">
      <img src={notelo_red} width="69" height="50"/>
        Notepad.io
      </header>
    <div className="classmenu">
      testing
    </div>
    <div className="note">
      testing
    </div>

    </div>
  );
}

export default Mainpage;
