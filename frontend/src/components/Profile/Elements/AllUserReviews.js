import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '.././../Elements/Header/Header';


const AllSellerReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/review/profilereviews/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('key')}`
        }
      })
        .then(response => response.json())
        .then(data => setReviews(data));

    }, []);
    const handleProductClick = (id) => {
      navigate('/product/' + id);
    }
    return (
    <>
    <Header />
      <div className="center" style={{ }}>
        <div className="box">
          <div className="profile"></div>
      <div className='card_mini' style={{ color: 'white' }}>
        <div style={{ fontFamily: 'Verdana',display: 'flex', justifyContent: 'space-between' }}><a>Все отзывы к товарам продавца:</a></div>
        {reviews.map((review) => {
          let myImage;
          if (review.images) {
            const imageName = review.images.split('/').pop();
            myImage = require(`../../../goods/images/${imageName}`);
          } else {
            myImage = require('../../../images/Placeholder-1.png');
          }
          return (
            <>
              <div className="product-card">
              <div className="product-card-mini" style={{ width: '450px', fontFamily: 'Verdana', borderColor: 'rgb(120,120,120)' }}>
                  <div className="product-image">
                  </div>
                  <div className="product-info">
                  <div className="space" key={id} style={{ cursor: 'default' }}>
                      <h1 className="good_name_mini" style={{  fontSize: '16px' }}>{review.title.substring(0, 75)}</h1>
                      <h3 className="good_price" style={{ fontSize: '14px', marginTop: '10px' }}>{review.username}</h3>
                      <h3 className="good_price" style={{ fontSize: '14px', marginTop: '10px' }}>Оценка: {review.rating} ⭐</h3>
                      <div className="discripto" style={{ width: '250px', fontSize: '14px' }}>{review.text.substring(0, 200)}</div>
                  </div>
                  </div>
              </div>
              <div className="product-card-mini" style={{ width: '450px', border: 'none' }}>
                    <div className="product-image" onClick={() => handleProductClick(review.good)} style={{ cursor: 'pointer' }}>
                    {myImage && <img className="image" style={{ height: '150px' }} src={myImage} alt='' />}
                    </div>
                    <div className="product-info">
                    <div className="space" key={id} onClick={() => handleProductClick(review.good)}>
                        <h1 className="good_name_mini" style={{  fontSize: '16px' }}>{review.namegoods.substring(0, 75)}</h1>
                        <h3 className="good_price" style={{ fontSize: '14px', marginTop: '10px' }}>Цена: {review.price} руб.</h3>
                        <div className="discripto" style={{ width: '250px', fontSize: '14px' }}>{review.description_goods.substring(0, 200)}</div>
                    </div>
                    </div>
                </div>
                </div>
            </>
          );
        })}
      </div>
        </div>
       </div>
      </>
    );
  };

export default AllSellerReviews;