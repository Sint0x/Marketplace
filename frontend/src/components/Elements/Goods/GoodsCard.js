import React, { useState, useEffect, useRef } from 'react';
import './style.css';

const GoodsCard = () => {
  const [products, setProducts] = useState([]);
  const filtersRef = useRef(null);

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

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/testcontent')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  if (products.length === 0) {
    return <p>No goods</p>;
  }

  return (
    <div className='card'>
      {products.map((product) => {
        const { username, rating, first_name, last_name, description_goods, price, images, namegoods, goods_id, afrom } = product;
        let myImage;
        if (images) {
          const imageName = images.split('/').pop();
          myImage = require(`../../../goods/images/${imageName}`);
        } else {
          myImage = require(`../../../goods/images/IMG_20230804_134452_081.jpg`);
        }
        return (
          <div key={goods_id} className="product-card">
            <div className="product-image">
              {myImage && <img className="image" src={myImage} alt={namegoods} />}
            </div>
            <div className="product-info">
              <div className="space">
                <h1 className="good_name">{namegoods.substring(0, 75)}</h1>
                <h3 className="good_price">Цена: {price} руб.</h3>
                <div className="discripto" >{description_goods.substring(0, 200)}</div>
              </div>
              <div className="adress"><p className="good_adress">{afrom}</p><p className="rating_seller">Продавец: {rating}⭐<br></br><span style={{ marginRight: '10px' }}>{first_name}</span><span style={{ marginRight: '10px' }}>{username}</span>{last_name}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GoodsCard;
