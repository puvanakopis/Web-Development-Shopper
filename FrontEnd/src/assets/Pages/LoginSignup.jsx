import React, { useState } from 'react';
import './LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState('Sign Up');

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function");
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace('/');
      } else {
        console.log("Login failed:", responseData.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };



  const signUp = async () => {
    console.log("SignUp function triggered");

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const responseData = await response.json();
      console.log("Signup response:", responseData);

      if (response.ok && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        alert("Signup successful!");
        window.location.replace('/');
      } else {
        alert(responseData.errors || "Signup failed.");
        console.error("Signup failed:", responseData.errors);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };


  return (
    <div className='loginsignup'>
      <div className="loginsingup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fields">
          {state === 'Sign Up' && (
            <input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='Your Name' />
          )}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Password' />
        </div>
        <button onClick={() => { state === 'Log in' ? login() : signUp() }}>Continue</button>
        {state === 'Sign Up' && (
          <p className='loginsignup-login'>
            Already have an account? <span onClick={() => setState('Log in')}>Login here</span>
          </p>
        )}
        {state === 'Log in' && (
          <p className='loginsignup-login'>
            Create an account? <span onClick={() => setState('Sign Up')}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
