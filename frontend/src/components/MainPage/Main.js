import React, { useState, useEffect } from 'react';
import ProductCard from '../Elements/Goods/ProductCard';
import Header from '../Elements/Header/Header';
import './style.css'





// главная страница с контентом карточки товара
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
          setUsername(data.username);
        });
    }
  }, []);

  return (
    <>
        <Header />
        <div className="center">
            <div className="box" style={{ color: 'white' }}>
                <h1>РЕКОМЕНДАЦИИ:</h1>
                <ProductCard />
            </div>
        </div>
    </>
);
}
export default MainPage;
