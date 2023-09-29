import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductSellerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1); // Добавьте состояние для отслеживания текущей страницы
  const [maxPage, setMaxPage] = useState(null); // Добавьте состояние для отслеживания максимальной страницы
  const [startPage, setStartPage] = useState(1); // Добавьте состояние для отслеживания начальной страницы для кнопок
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/review/profilereviews/${id}?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('key')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setReviews(data.results);
        setMaxPage(Math.ceil(data.count / 5));
        // setMaxPage(Math.ceil(data.count / data.results.length));
        setStartPage(Math.floor((page - 1) / 20) * 20 + 1); // Вычислите максимальную страницу на основе общего количества отзывов
      });
    // .then(data => setReviews(data.slice(0, 4)));// Ограничиваем количество отзывов до 4
  }, [page]); // Обновите список отзывов при изменении страницы

  const handleProductClick = (id) => {
    navigate('/product/' + id);
  }

  // Добавьте функции для обработки нажатия на кнопки "Назад" и "Вперед"
  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1)); // Уменьшите номер страницы, но не меньше 1
 
  }
  const handleNextPage = () => {
    setPage(prevPage => prevPage < maxPage ? prevPage + 1 : prevPage); // Увеличьте номер страницы, если это не последняя страница

  }

  // Добавьте функцию для обработки нажатия на кнопки номеров страниц
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  }
  if (reviews.length !== 0) {
  return (
    <div className="center" style={{ }}>
    <div className="box">
        <div className="profile">
    <div className='card_mini' style={{ color: 'white' }}>
      <div style={{ fontFamily: 'Verdana', display: 'flex', justifyContent: 'space-between' }}><a>Отзывы к товарам продавца:</a></div>
      <div style={{ width: '102%' }}>
      <button onClick={() => setPage(1)}>Первая страница</button>
      <button onClick={handlePrevPage}>Назад</button>
      {[...Array(Math.min(20, maxPage - startPage + 1)).keys()].map(i =>
        <button

          onClick={() => handlePageClick(startPage + i)}
          style={{ backgroundColor: startPage + i === page ? 'lightblue' : 'white' }}
        >
          {startPage + i}
        </button>)}
      <button onClick={handleNextPage}>Вперед</button>
      <button onClick={() => setPage(maxPage)}>Последняя страница</button>
      </div>
      {reviews.map((review) => {
        let myImage;
        if (review.images) {
          const imageName = review.images.split('/').pop();
          myImage = require(`../../../goods/images/${imageName}`);
        } else {
          myImage = require('../../../images/Placeholder-1.png');
        }
        return (

            <div key={review.id} className="product-card">
              <div className="product-card-mini" style={{ width: '450px', fontFamily: 'Verdana', borderColor: 'rgb(120,120,120)' }}>
                <div className="product-image">
                </div>
                <div className="product-info">
                  <div className="space" key={id} style={{ cursor: 'default' }}>
                    <h1 className="good_name_mini" style={{ fontSize: '16px' }}>{review.title.substring(0, 75)}</h1>
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
                    <h1 className="good_name_mini" style={{ fontSize: '16px' }}>{review.namegoods.substring(0, 75)}</h1>
                    <h3 className="good_price" style={{ fontSize: '14px', marginTop: '10px' }}>Цена: {review.price} руб.</h3>
                    <div className="discripto" style={{ width: '250px', fontSize: '14px' }}>{review.description_goods.substring(0, 200)}</div>
                  </div>
                </div>
              </div>
            </div>

        );
      })}
      {/* <div style={{ width: '102%' }}>
      <button onClick={() => setPage(1)}>Первая страница</button>
      <button onClick={handlePrevPage}>Назад</button>
      {[...Array(Math.min(20, maxPage - startPage + 1)).keys()].map(i =>
        <button
          key={i}
          onClick={() => handlePageClick(startPage + i)}
          style={{ backgroundColor: startPage + i === page ? 'lightblue' : 'white' }}
        >
          {startPage + i}
        </button>)}
      <button onClick={handleNextPage}>Вперед</button>
      <button onClick={() => setPage(maxPage)}>Последняя страница</button>
      </div> */}
    </div>
    </div>
          </div>
      </div>
  )};
};
export default ProductSellerReviews;
