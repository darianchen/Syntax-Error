import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

const NotFoundPage = () => {
  useEffect(() => {
    import('./notpagefound.js')
      .then((module) => {
      });
  }, []);
  const navigate = useHistory();

  const redirectHandler = () => {
    if (
      localStorage.getItem('token') !== null
      && localStorage.getItem('token') !== ''
    ) {
      navigate.push('/questions');
    } else {
      navigate.push('/');
    }
  };

  return (
    <div id="not-found-container">
      <button type="button" onClick={redirectHandler} id="home-button">Go to the Homepage</button>
      <div id="not-found-content">
        <h1 id="first-four">4</h1>
        <div id="cog-wheel1">
          <div id="cog1">
            <div id="top" />
            <div id="down" />
            <div id="left-top" />
            <div id="left-down" />
            <div id="right-top" />
            <div id="right-down" />
            <div id="left" />
            <div id="right" />
          </div>
        </div>     
        <h1 id="second-four">4</h1>
      </div>
      <p id="wrong-para">OOPS! Page Not found!</p>
    </div>
  );
};

export default NotFoundPage;