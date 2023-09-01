import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);
  if (!product) {
    return <p>Loading...</p>;
  }

  let myImage;
  if (product.images) {
    const imageName = product.images.split('/').pop();
    myImage = require(`./../../goods/images/${imageName}`);
    } else {
      myImage = require(`./../../goods/images/IMG_20230804_134452_081.jpg`);
    }
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ color: 'white' }}>
      <h1>{product.namegoods}</h1>
      <img className="image" src={myImage} alt={product.namegoods} />
      <p>Описание: {product.description_goods}</p>
      <p>Цена: {product.price} руб.</p>
      <p>Продавец: {product.user}</p>
      <p>Место продажи: {product.afrom}</p>
    </div>
  );
};

export default ProductPage;
