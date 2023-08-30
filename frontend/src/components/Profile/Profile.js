import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../Elements/Header/Header';



// профиль юзера с контентом
function Profile() {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("key");
        fetch('http://127.0.0.1:8000/api/profile', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
      })
            .then(response => response.json())
            .then(data => setUserData(data));
    }, []);
    if (!userData) {
      return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate('/profile/edit');
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('key');
        window.location.reload();
    }
    
    // Извлечение имени файла из строки с путем к файлу
    const parts = userData.profile_image.split('/');
    const filename = parts[parts.length - 1];
    const myImage = require('../../images/avatars/' + filename);

    console.log(userData.profile_description)
    return (
      <>
      <Header />
      <div className="center">
          <div className="box">
              <div className="profile">
                  <div className="avatarblock"><img className="avatar" src={myImage} alt="" /></div>
                  <div className="text">
                      <div className="bottons">
                          <button className="edit-button" onClick={handleEditClick}>Редактировать</button>
                          <button className="logout-button" onClick={handleLogoutClick}>Выйти</button>
                      </div>
                      <div className="nickname-rating"> 
                          
                          <div className="nickname">{userData.username}</div>
                          <div className="name" style={{marginTop: "15px"}}>{userData.first_name} {userData.last_name}</div>
                          <div className="rating">Рейтинг: {userData.rating}</div>
                      </div>
                  </div>   
              </div>
              <div className="description">{userData.profile_description}</div>
          </div>
      </div>
      </>
    );
}

export default Profile;
