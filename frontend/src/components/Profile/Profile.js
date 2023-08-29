import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Elements/Header/Header';
import './style.css';
import LogoutButton from '../auth/logout';

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
    console.log(userData.profile_description)
    return (
      <>
      <Header />
      <div className="center">
          <div className="box">
              <div className="profile">
                  <div className="avatarblock"><img className="avatar" src="data:image/jpeg;base64,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" alt="" /></div>
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
