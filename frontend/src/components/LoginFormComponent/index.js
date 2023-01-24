import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useNavigate } from "react-router-dom";
import './LoginForm.css';
import Typewriter from 'typewriter-effect/dist/core'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    document.querySelector(".demo").disabled = true;
    document.querySelector("#email").disabled = true;
    document.querySelector("#password").disabled = true;

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
      <div className="three-buttons">

        {/* <button id="google" type="button">        
            <svg aria-hidden="true" className="icon google" width="18" height="18" viewBox="0 0 18 18"><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z" fill="#4285F4"></path><path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z" fill="#34A853"></path><path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" fill="#FBBC05"></path><path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z" fill="#EA4335"></path></svg>
              Log in with Google
        </button>

        <button id="github" type="button">
            <svg aria-hidden="true" className="icon github" width="18" height="18" viewBox="0 0 18 18"><path d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1Z" fill="#010101"></path></svg>
              Log in with Github
        </button>     
        <button id="facebook" type="button">
          <svg aria-hidden="true" className="icon facebook" width="18" height="18" viewBox="0 0 18 18"><path d="M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5Z" fill="#4167B2"></path></svg>
            Log in with Facebook
        </button> */}
      </div>
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
            />
            {passwordError && <p style={{color: 'red'}}>{passwordError}</p>}

            <button className="login-button" type="submit">Log in</button>
            <button className="login-button demo" type="submit" onClick={handleDemo}>Demo login</button>
      </div>
      <div className="two-links">
        <div>
          Don't have an account?
          <Link to="/signup">
          <a href="#"> Sign up</a>
          </Link>
        </div>
        <div>
          Are you an employer?
          <a href="#"> Sign up on Talent</a> 
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M5 1H3a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V9h-2v2H3V3h2V1Zm2 0h6v6h-2V4.5L6.5 9 5 7.5 9.5 3H7V1Z"></path></svg>
        </div>
      </div>
      </form>
    </div>
  );
}

export default LoginFormPage;