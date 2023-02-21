import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useNavigate } from "react-router-dom";
import './LoginForm.css';
import Typewriter from 'typewriter-effect/dist/core'
import { useRef } from "react";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [disabled, setDisabled] = useState(false);

  if (sessionUser) return <Redirect to="/" />;

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleEmptiness = () => {
    if(email === "" && password === ""){
      setEmailError("Email cannot be empty.");
      setPasswordError("Password cannot be empty.");
    } else if (email === "" && password !== ""){
      setEmailError("Email cannot be empty.");
      setPasswordError("");
    } else {
      setEmailError("");
      setPasswordError("Password cannot be empty.");
    }
  }

  const validateProperEmail = () => {
    if (!isValidEmail(email)) {
        setEmailError("The email is not a valid email address.")
        setPasswordError("")
        setErrors([]);
    } else {
      setEmailError("");
      setPasswordError("");
      setErrors([]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    handleEmptiness();
    validateProperEmail();

    if (errors.length !== 0){
      setEmailError("");
      setPasswordError("");
    }

    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors){
          setErrors(data.errors);
        }
      });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setDisabled(!disabled);

    // document.querySelector(".demo").disabled = true;
    // document.querySelector("#email").disabled = true;
    // document.querySelector("#password").disabled = true;

    let emailDOM = document.getElementById("email");
    let passwordDOM = document.getElementById("password")
    let emailNodeCreator = function(character){
      emailDOM.value = emailDOM.value + character;
      return null;
    }

    let emailTypewriter = new Typewriter(emailDOM,
      {
        onCreateTextNode: emailNodeCreator
      });

      emailTypewriter
        .typeString("demo@user.io")
        .start();

      let passwordNodeCreator = function(character){
          passwordDOM.value = passwordDOM.value + character;
          return null;
        };
    
    let passwordTypewriter = new Typewriter(passwordDOM,
      {
        onCreateTextNode: passwordNodeCreator
      });
    
        passwordTypewriter
          .typeString("password")
          .start()
          
        setTimeout(demoLogin,2600);
  };

  const demoLogin = () => {
    dispatch(sessionActions.login( {email: "demo@user.io", password: "password" }));
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <Link to="/">
          <svg id="stack-logo"aria-hidden="true" width="32" height="37" viewBox="0 0 32 37"><path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path><path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path></svg>        
        </Link>   
      <div className="credentials">
        <ul>
        </ul>
          <label htmlFor="email" id="emailLabel">
            Email
          </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={disabled}
            />
            {errors.map(error => <li key={error}>{error}</li>)}
            {emailError && <p style={{color: 'red'}}>{emailError}</p>}
            <label htmlFor="password" id="passwordLabel">
              Password
              <a id="forgot-password" href="https://www.wikihow.com/Remember-a-Forgotten-Password">Forgot password?</a>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled}
            />
            {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}

            <button className="login-button log-hover" type="submit" disabled={disabled}>Log in</button>
            <button className="demo" type="submit" onClick={handleDemo} disabled={disabled}>Demo login</button>
      </div>
      <div className="link">
        <div>
          Don't have an account?
          <Link to="/signup">
            <span> Sign up</span>
          </Link>
        </div>
      </div>
      </form>
    </div>
  );
}

export default LoginFormPage;