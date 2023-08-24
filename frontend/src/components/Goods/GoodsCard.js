import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import './script.js'

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
    <div className='main'>
      <div className='Filters' style={{backgroundColor: 'red'}} onClick={myFunction}>
        <h3>Фильтры</h3>
        <div className='FiltersList' ref={filtersRef} style={{display: 'none', position: 'absolute', zIndex: '1', backgroundColor: 'red', minWidth: '100px'}} onClick={stopPropagation}>
          <h3>tipo filter</h3>
          <h3>tipo filter</h3>
          <h3>tipo filter</h3>
        </div>
      </div>
      <div className="products-list">
        {products.map((product) => {
          const { user, description_goods, price, images, namegoods, goods_id, afrom } = product;
          return (
            <div key={goods_id} className="product-card">
              <p>Продавец: {user}</p>
              <img src={images} alt={namegoods} />
              <h3>{namegoods}</h3>
              <p>{description_goods}</p>
              <p>Цена: {price} руб.</p>
              <p>Производитель: {afrom}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoodsCard;



























// import React, { useState, useEffect } from 'react';
// const GoodsCard = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/testcontent')
//       .then((response) => response.json())
//       .then((data) => setProducts(data));
//   }, []);

//   return (
//     <div className="products-list">
//       {products.map((product) => {
//         const { user, description_goods, price, images, namegoods, goods_id, afrom } = product;
//         return (
//           <div key={goods_id} className="product-card">
//             <img src={images} alt={namegoods} />
//             <h3>{namegoods}</h3>
//             <p>{description_goods}</p>
//             <p>Цена: {price} руб.</p>
//             <p>Производитель: {afrom}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default GoodsCard;
