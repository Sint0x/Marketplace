import React, { useState } from 'react';
import './style.css';
import LoginForm from './Login';
import RegistrationForm from './Registr';
import Header from '../Elements/Header/Header';


// страница авторизации\регистрации
const Auth = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegistration(false);
  };

  const handleRegistrationClick = () => {
    setShowLogin(false);
    setShowRegistration(true);
  };
  return (
    <>
      <Header />
      <div className="center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '88vh' }}>
        <div className="mainblock">
          <div className="block">
            <div className={`blockhidden formlogin ${showLogin ? 'b-showlogin' : ''}`}>
              <div>
                <LoginForm />
              </div>
            </div>
            <div className={`blockhiddenreg formreg ${showRegistration ? 'b-showreg' : ''}`} id="Registration">
              <RegistrationForm />
            </div>

            <section className="block__item block-item">
              <h2 className="phrase">У вас уже есть аккаунт?</h2>
              <button className="button" onClick={handleLoginClick}>Войти</button>
            </section>
            <section className="block__item block-item">
              <h2 className="phrasereg">У вас нет аккаунта?</h2>
              <button className="buttonreg" onClick={handleRegistrationClick}>Регистрация</button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};


export default Auth;