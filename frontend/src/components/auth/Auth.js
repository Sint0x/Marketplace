import React, { useState } from 'react';
import './style.css';
import LoginForm from './Login';
import RegistrationForm from './Registr';


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
  React.useEffect(() => {
    document.body.style.fontFamily = "'Lato', sans-serif";
    document.body.style.margin = 0;
    document.body.style.minHeight = '100vh';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.backgroundColor = 'rgb(56, 87, 143)';
    document.body.style.backgroundBlendMode = 'difference';
    document.body.style.transition = '0s';

    return () => {
      document.body.style.fontFamily = null;
      document.body.style.margin = null;
      document.body.style.minHeight = null;
      document.body.style.display = null;
      document.body.style.justifyContent = null;
      document.body.style.alignItems = null;
      document.body.style.backgroundColor = null;
      document.body.style.backgroundBlendMode = null;
      document.body.style.transition = null;
    };
  }, []);

  return (
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
  );
};

export default Auth;

