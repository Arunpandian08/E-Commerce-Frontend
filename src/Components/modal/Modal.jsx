import React, { useState } from 'react';
import './modal.css';
import Login from '../login/Login';
import Register from '../register/Register';

const Modal = ({ onClose ,setNavVisible }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div onClick={onClose} className='modal'>
      <div onClick={e => e.stopPropagation()} className='modal-content'>
        <div className={`card ${isLogin ? '' : 'flipped'}`}>
          <Login onClose={onClose} toggleForm={toggleForm} setNavVisible={setNavVisible} />
          <Register onClose={onClose} toggleForm={toggleForm} setNavVisible={setNavVisible} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
