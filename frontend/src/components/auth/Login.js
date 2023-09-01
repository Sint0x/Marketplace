import React, { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

//форма и ендпоинт логина
const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

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
        setErrorMessage(data.error);
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
        required/>
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
        required/>
      <br />
      <button type="submit" class="form_btn_login" >Войти</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default LoginForm;
