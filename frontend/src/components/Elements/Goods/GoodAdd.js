import React, { useState } from 'react';
import Header from '../Header/Header';

function AddGoodForm() {
    const [descriptionGoods, setDescriptionGoods] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState(null);
    const [namegoods, setNamegoods] = useState('');
    const [afrom, setAfrom] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!images) {
            setError('Изображение обязательно');
            return;
        }

        setError(null);
        const token = localStorage.getItem("key");
        const formData = new FormData();
        formData.append('description_goods', descriptionGoods);
        formData.append('price', price);
        formData.append('images', images);
        formData.append('namegoods', namegoods);
        formData.append('afrom', afrom);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/add_good', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                },
                body: formData
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Header />
            <form onSubmit={handleSubmit}>
                <label>
                    Описание товара:
                    <input
                        type="text"
                        value={descriptionGoods}
                        onChange={event => setDescriptionGoods(event.target.value)}
                    />
                </label><br />
                <label>
                    Цена:
                    <input
                        type="text"
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />
                </label><br />
                <label>
                    Изображение:
                    <input
                        type="file"
                        onChange={event => setImages(event.target.files[0])}
                    />
                </label><br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>
                    Название товара:
                    <input
                        type="text"
                        value={namegoods}
                        onChange={event => setNamegoods(event.target.value)}
                    />
                </label><br />
                <label>
                    Место происхождения:
                    <input
                        type="text"
                        value={afrom}
                        onChange={event => setAfrom(event.target.value)}
                    />
                </label><br />
                <button type="submit">Добавить товар</button>
            </form>
        </>
    );
}

export default AddGoodForm;
