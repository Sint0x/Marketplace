import React, { useState } from 'react';
import Header from '../Elements/Header/Header';
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
    <div className="center" >
        <div className="box">
            <form onSubmit={handleSubmit}>
            <div className="divname inputs"><p className='tags'>Название товара</p>
                    <input className='inname field'
                        type="text"
                        value={namegoods}
                        onChange={event => setNamegoods(event.target.value)}
                    />
                </div>
                <div className="divprice inputs"><p className='tags'>Цена</p>
                    <input className='inprice field'
                        type="number"
                        pattern="[0-9]"
                        value={price}
                        onChange={event => setPrice(event.target.value)}
                    />
                    <p className='pricevalue tags'>руб.</p>
                </div>
                <div className="divdesc inputs"><p className='tags'>Описание товара</p>
                    <textarea className='indesc field'
                        type="text" 
                        value={descriptionGoods}
                        onChange={event => setDescriptionGoods(event.target.value)}/>
                </div>
                <div className="divfrom inputs"><p className='tags'>Место происхождения</p>
                    <input className='infrom field'
                        type="text"
                        value={afrom}
                        onChange={event => setAfrom(event.target.value)}
                    />
                </div>
                <div className="divpicture inputs"><p className='tags'>Изображение</p>
                    <input id='input' className='inpicture field' style={{marginTop:'15px'}}
                        type="file"
                        aria-hidden="false"
                        onChange={event => setImages(event.target.files[0])}
                    />
                    <label className='addfile' for="input"><span className='span'>Добавить файл</span></label>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className='addfile span' type="submit">Добавить товар</button>
            </form>
        </div>
    </div>
    </>
);
}

export default AddGoodForm;