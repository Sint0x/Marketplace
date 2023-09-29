import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const filtersRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

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
    fetch('http://127.0.0.1:8000/api/userproductlist/' + id, {
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
  const handleShowClick = () => {
    navigate(`/profile/${id}/products`);
  };
  if (products.length !== 0) {
  return (
    <div className="center" style={{ }}>
    <div className="box">
        <div className="profile">
    <div className='card_mini' style={{ color: 'white' }}>
        <div style={{ fontSize: '30px', display: 'flex', justifyContent: 'space-between' }}><a>последние товары пользователя:</a><a onClick={handleShowClick} href=''>показать всё</a></div>
        {/* <a style={{ fontSize: '25px', marginLeft: '12px'}} >ЮЗЕР ПРОДАЕТ:</a> */}
      {products.map((product) => {
        const { username, rating, first_name, last_name, description_goods, price, images, id, namegoods, afrom } = product;
        let myImage;
        if (images) {
          const imageName = images.split('/').pop();
          myImage = require(`../../../goods/images/${imageName}`);
        } else {
          myImage = require(`../../../images/Placeholder-1.png`);
        }
        return (
                <div key={id} className="product-card-mini" style={{ width: '450px' }}>
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
              </div>
          </div>
      </div>
  )};
};

export default UserProducts;
