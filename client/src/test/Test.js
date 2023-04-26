import React, { useState } from 'react';

const MainContent = () => {
  const [uid, setUid] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/loginUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: uid
      }),
      credentials: 'include'
    }).then(setMessage('Session created! visit http://localhost:8080/getSession to view your session'))
  };

  return (
    <>
      <div className="main-content">
        <h1>Form</h1>
        <form onSubmit={submitForm}>
          <p>enter UID for it to work properly</p>
          <input type='text' name="uid" value={uid} onChange={(e) => { setUid(e.target.value) }}></input>
          <input type="submit"></input>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
};

export default MainContent;