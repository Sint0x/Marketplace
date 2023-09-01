import React, { useState } from 'react';
import './style.css';

// форма и ендпоинт регистрации
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
      email: '',
      username: '',
      password: '',
      password2: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
      setFormData({
          ...formData,
          [event.target.name]: event.target.value
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.password.length < 8) {
        setErrorMessage('Пароль должен содержать не менее 8 символов');
        return;
    } else if (formData.password !== formData.password2) {
        setErrorMessage('Пароли не совпадают');
        return;
    } else {
        setErrorMessage('');
    }
    
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        console.log(formData)
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
            setSuccessMessage(data.success);
        } else if (data.error) {
            setErrorMessage(data.error);
        }
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
              style={{ marginBottom: 10 }}
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
              style={{ marginBottom: 10 }}
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
              style={{ marginBottom: 10 }}
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
              style={{ marginBottom: 10 }}
          />
          <br />
          <button type="submit" class="form_btn_reg">Зарегестрироваться</button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
  );
};
export default RegistrationForm;

