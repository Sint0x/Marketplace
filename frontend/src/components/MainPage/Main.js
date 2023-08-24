import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GoodsCard from '../Goods/GoodsCard'



const MainPage = () => {
  const [message, setMessage] = useState(null);
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("key");
    if (token) {
      fetch("http://127.0.0.1:8000/api/testoken", {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setMessage(data.message));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('key');
    if (token) {
      fetch('http://127.0.0.1:8000/api/tokencheck', {
        method: 'GET',
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setAuth(data.result);
          // setUsername('qweqwrrwqw');
          setUsername(data.username);
        });
    }
  }, []);

  return (
    <div>
      <h1>MainPage</h1>
      {auth ? (
        <h4>{username}</h4>
      ) : (
        <li>
          <Link to="/login">войти</Link>
        </li>
      )}
      <li>
        <Link to="/profile">Профиль</Link>
      </li>
      {message && <p>{message}</p>}
      <GoodsCard />
    </div>
  );
};

export default MainPage;
