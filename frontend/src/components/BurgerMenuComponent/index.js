import React, { useState } from 'react';
import './BurgerMenu.css'

const BurgerMenu = () => {
  const [status, setStatus] = useState('close');
  return (
      <div className="BurgerMenu__container" role="button" onClick={() => setStatus(status === 'open' ? 'close' : 'open')}>
        <i className={status}></i>
        <i className={status}></i>
        <i className={status}></i>
      </div>
  );
};

export default BurgerMenu;