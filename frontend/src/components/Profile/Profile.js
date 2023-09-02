import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { useParams } from 'react-router-dom';
import Header from '../Elements/Header/Header';
import Linkify from 'react-linkify';
import UserProducts from '../Elements/Goods/UserProducts';


// профиль юзера с контентом
function Profile() {
    const [userData, setUserData] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // Get current user id from token check endpoint
        const token = localStorage.getItem("key");
        if (token) {
            fetch('http://127.0.0.1:8000/api/tokencheck', {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => setCurrentUserId(data.user_id));
        }

        // Get profile data
        fetch(`http://127.0.0.1:8000/api/user/${id}`, {
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
        navigate(`/profile/${id}/edit`);
    }

    const handleLogoutClick = () => {
        localStorage.removeItem('key');
        window.location.reload();
    }
    
    // Извлечение имени файла из строки с путем к файлу
    let myImage;
    try {
        const parts = userData.profile_image.split('/');
        const filename = parts[parts.length - 1];
        myImage = require('./../../images/avatars/' + filename);
    } catch (error) {
        myImage = require('./../../images/avatars/IMG_20230804_134452_081.jpg');
    }
    
    const linkDecorator = (href, text, key) => (
      <a href={href} key={key} style={{ color: 'PaleVioletRed' }}
        onMouseEnter={e => e.target.style.color = 'DeepPink'} onMouseLeave={e => e.target.style.color = 'PaleVioletRed'}>
        {text}
      </a>
    );
    
    return (
      <>
      <Header />
      <div className="center">
          <div className="box">
              <div className="profile">
                  <div className="avatarblock"><img className="avatar" src={myImage} alt="" /></div>
                  <div className="text">
                      {/* Check if user is viewing their own profile */}
                      {currentUserId === parseInt(id) && (
                        <div className="bottons">
                            <button className="edit-button" onClick={handleEditClick}>Редактировать</button>
                            <button className="logout-button" onClick={handleLogoutClick}>Выйти</button>
                        </div>
                      )}
                      <div className="nickname-rating"> 
                          <div className="nickname">{userData.username}</div>
                          <div className="name" style={{ marginBottom: '20px' }}>{userData.first_name} {userData.last_name}</div>
                          <div className="rating">Рейтинг: {userData.rating}</div>
                      </div>
                  </div>   
              </div>
              <div className="description"><Linkify componentDecorator={linkDecorator}>{userData.profile_description}</Linkify></div>
          </div>
      </div>
      <div className="center" style={{ }}>
          <div className="box">
              <div className="profile">
                <UserProducts />
              </div>
          </div>
      </div>
      </>
    );
}

export default Profile;
