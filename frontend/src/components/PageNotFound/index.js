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
    <div className="container">
      <button type="button" onClick={redirectHandler} className="home-button">Go to the Homepage</button>
      <div className="content">
        <h1 className="first-four">4</h1>
        <div className="cog-wheel1">
          <div className="cog1">
            <div className="top" />
            <div className="down" />
            <div className="left-top" />
            <div className="left-down" />
            <div className="right-top" />
            <div className="right-down" />
            <div className="left" />
            <div className="right" />
          </div>
        </div>     
        <h1 className="second-four">4</h1>
      </div>
      <p className="wrong-para">OOPS! Page Not found!</p>
    </div>
  );
};

export default NotFoundPage;