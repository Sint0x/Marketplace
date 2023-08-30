import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../Elements/Header/Header';


function UpdateProfileForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    profile_description: ''
  });
  const [profileImage, setProfileImage] = useState(null);
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
      .then(data => {
        setFormData({
          first_name: data.first_name,
          last_name: data.last_name,
          profile_description: data.profile_description
        });
        // Извлечение имени файла из строки с путем к файлу
        const parts = data.profile_image.split('/');
        const filename = parts[parts.length - 1];
        setProfileImage(require('../../images/avatars/' + filename));
      });
  }, []);
  if (!FormData) {
    return <div>Loading...</div>;
  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const handleSaveClick = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("key");
    fetch('http://127.0.0.1:8000/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        // обработайте ответ от сервера здесь
      });
    navigate('/profile');
    window.location.reload();
  }

  const handleCancelClick = () => {
    navigate('/profile');
    window.location.reload();
  }

  return (
    <>
    <Header />
      <div className="center">
          <div className="box">
              <div className="profile">
                  <div className="avatarblock"><img className="avatar" src={profileImage} alt="" /></div>
                  <div className="text">
                      <div className="bottons">
                          <button className="edit-button" onClick={handleSaveClick}>Сохранить</button>
                          <button className="logout-button" onClick={handleCancelClick}>Отменить</button>
                      </div>
                      <div className="nickname-rating"> 
                          
                          <div className="nickname"><input className="textarea-inputs" name="first_name" type="text" value={formData.first_name} onChange={handleChange} /></div>
                          <div className="name" style={{marginTop: "30px"}}><input className="textarea-inputs" style={{fontFamily: "Garamond"}} name="last_name" type="text" value={formData.last_name} onChange={handleChange} /></div>
                      </div>
                  </div>   
              </div>
              <div className="name"><textarea style={{fontSize: "20px"}} className="textarea-inputs" cols="80vh" rows="5" name="profile_description" type="text" value={formData.profile_description} onChange={handleChange}></textarea></div>
          </div>
      </div>
    </>
  );
}
export default UpdateProfileForm;