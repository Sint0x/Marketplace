import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';



const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password1: '',
    password2: ''
});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Регистрация</h3>
      <input
        placeholder='Введите логин'
        class="form_input"
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        style={{marginBottom:10}}
      />
      <br />
      <input
        placeholder='Введите E-mail'
        class="form_input"
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        style={{marginBottom:10}}
      />
      <br />
      <input
        placeholder='Введите пароль'
        class="form_input"
        type="password"
        id="password1"
        name="password1"
        value={formData.password1}
        onChange={handleChange}
        style={{marginBottom:10}}
      />
      <br />
      <input
        placeholder='Подтвердите пароль'
        class="form_input"
        type="password"
        id="password2"
        name="password2"
        value={formData.password2}
        onChange={handleChange}
        style={{marginBottom:10}}
      />
      <br />
      <button type="submit" class="form_btn_reg" >Зарегестрироваться</button>
    </form>
  );
};





const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        // Сохраняем токен в локальное хранилище с ключом "token"
        localStorage.setItem("key", data.key);
        navigate('/');
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Вход</h3>
      <input
        placeholder='Введите логин'
        class="form_input"
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        style={{marginBottom:10}}
      />
      <br />
      <input
        placeholder='Введите пароль'
        class="form_input"
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        style={{marginBottom:10}}
      />
      <br />
      <button type="submit" class="form_btn_login" >Войти</button>
      <br />
      <a href="#" className="form_forgot">
              Восстановить пароль
            </a>
    </form>
  );
};



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

