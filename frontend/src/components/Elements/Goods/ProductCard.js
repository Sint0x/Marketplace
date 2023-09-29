import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

const GoodsCard = () => {
  const [products, setProducts] = useState([]);
  const filtersRef = useRef(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const [startPage, setStartPage] = useState(1);

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
    fetch(`http://127.0.0.1:8000/api/productlist?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        setMaxPage(Math.ceil(data.count / 4));
        setStartPage(Math.floor((page - 1) / 20) * 20 + 1);
      });
  }, [page]);

  const handleProductClick = (id) => {
    navigate('/product/' + id);
  }

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  }

  const handleNextPage = () => {
    setPage(prevPage => prevPage < maxPage ? prevPage + 1 : prevPage);
  }

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  }

  if (products.length === 0) {
    return <p>No goods</p>;
  }

  return (
    <div className='card'>
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
          <div className="product-card" style={{ fontFamily: 'Verdana' }}>
            <div className="product-image">
              {myImage && <img className="image" src={myImage} alt={namegoods} />}
            </div>
            <div className="product-info">
              <div className="space" key={id} onClick={() => handleProductClick(id)}>
                <h1 className="good_name">{namegoods.substring(0, 75)}</h1>
                <h3 className="good_price">Цена: {price} руб.</h3>
                <div className="discripto">{description_goods.substring(0, 200)}</div>
              </div>
              <div className="adress"><p className="good_adress">{afrom}</p><p className="rating_seller">Продавец: {rating}⭐<br></br><span style={{ marginRight: '10px' }}>{first_name}</span><span style={{ marginRight: '10px' }}>{username}</span>{last_name}</p></div>
            </div>
          </div>
        );
      })}
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
    </div>
  );
};

export default GoodsCard;
