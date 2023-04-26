import React, { useState } from 'react';

const MainContent = () => {
  const [email, setEmail] = useState('');

  const submitForm = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/loginUser', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email
      }),
      credentials: 'true'
    }).then(console.log('done'))
  };

  return (
    <>
      <div className="main-content">
        <h1>Form</h1>
        <form onSubmit={submitForm}>
          <input type='text' name="email" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
          <input type="submit"></input>
        </form>
      </div>
    </>
  );
};

export default MainContent;