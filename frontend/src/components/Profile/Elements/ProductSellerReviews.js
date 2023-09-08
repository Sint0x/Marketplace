import React, { useState } from 'react';
import { useEffect } from 'react';

const ProductSellerReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/review/goodsreviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('key')}`
        }
      })
        .then(response => response.json())
        .then(data => setReviews(data));
        console.log(reviews);
    }, []);
  
    return (
      <table style={{ color: 'white' }}>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Товар</th>
            <th>Заголовок</th>
            <th>Текст</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review.id}>
              <td>{review.user}</td>
              <td>{review.good}</td>
              <td>{review.title}</td>
              <td>{review.text}</td>
              <td>{review.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default ProductSellerReviews;