import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';


const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const filtersRef = useRef(null);
  const navigate = useNavigate();

  const myFunction = () => {
    if (filtersRef.current.style.display === "none") {
      filtersRef.current.style.display = "block";
    } else {
      filtersRef.current.style.display = "none";
    }
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }
  const token = localStorage.getItem("key");
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/userproductlist', {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  
  const handleProductClick = (id) => {
    navigate('/product/' + id);
  }

  if (products.length === 0) {
    return <p>No goods</p>;
  }

  return (
    <div className='card_mini' style={{ color: 'white' }}>
        <div style={{ fontSize: '30px', display: 'flex', justifyContent: 'space-between' }}><a>последние товары пользователя:</a><a href="/">показать всё</a></div>
        {/* <a style={{ fontSize: '25px', marginLeft: '12px'}} >ЮЗЕР ПРОДАЕТ:</a> */}
      {products.map((product) => {
        const { username, rating, first_name, last_name, description_goods, price, images, id, namegoods, afrom } = product;
        let myImage;
        console.log(id)
        if (images) {
          const imageName = images.split('/').pop();
          myImage = require(`../../../goods/images/${imageName}`);
        } else {
          myImage = require(`../../../goods/images/IMG_20230804_134452_081.jpg`);
        }
        return (
                <div className="product-card-mini" style={{ width: '450px' }}>
                    <div className="product-image">
                    {myImage && <img className="image" style={{ height: '150px' }} src={myImage} alt={namegoods} />}
                    </div>
                    <div className="product-info">
                    <div className="space" key={id} onClick={() => handleProductClick(id)}>
                        <h1 className="good_name_mini" style={{  fontSize: '16px' }}>{namegoods.substring(0, 75)}</h1>
                        <h3 className="good_price" style={{ fontSize: '14px', marginTop: '10px' }}>Цена: {price} руб.</h3>
                        <div className="discripto" style={{ width: '250px', fontSize: '14px' }}>{description_goods.substring(0, 200)}</div>
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
  );
};

export default UserProducts;
