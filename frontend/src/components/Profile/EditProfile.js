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
  const [previewImage, setPreviewImage] = useState(null);
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
        let myImage;
        try {
            const parts = data.profile_image.split('/');
            const filename = parts[parts.length - 1];
            myImage = require('../../images/avatars/' + filename);
        } catch (error) {
            myImage = require('../../images/avatars/IMG_20230804_134452_081.jpg');
        }
        setProfileImage(myImage);
      });
  }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('first_name', formData.first_name);
    formDataObj.append('last_name', formData.last_name);
    formDataObj.append('profile_description', formData.profile_description);
    if (profileImage) {
      formDataObj.append('profile_image', profileImage);
    }
    try {
      const token = localStorage.getItem("key");
      const response = await fetch('http://127.0.0.1:8000/api/profile/update', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formDataObj
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
                  <div className="avatarblock"><img className="avatar" src={previewImage || profileImage} alt="" /><input type="file" onChange={event => {if(event.target.files[0]) {setPreviewImage(URL.createObjectURL(event.target.files[0])); setProfileImage(event.target.files[0])}}} /></div>
                  <div className="text">
                      <div className="bottons">
                          <button className="edit-button" onClick={handleSubmit}>Сохранить</button>
                          <button className="logout-button" onClick={handleCancelClick}>Отменить</button>
                      </div>
                      <div className="nickname-rating"> 
                          
                          <div className="nickname"><input className="textarea-inputs" name="first_name" placeholder='имя' type="text" value={formData.first_name} onChange={event => setFormData({...formData, first_name: event.target.value})} /></div>
                          <div className="name" style={{marginTop: "30px"}}><input className="textarea-inputs" placeholder='фамилия' style={{fontFamily: "Garamond"}} name="last_name" type="text" value={formData.last_name} onChange={event => setFormData({...formData, last_name: event.target.value})} /></div>
                      </div>
                  </div>   
              </div>
              <div className="name"><textarea style={{fontSize: "20px"}} className="textarea-inputs" cols="80vh" rows="5" name="profile_description" type="text" placeholder='описание профиля'value={formData.profile_description} onChange={event => setFormData({...formData, profile_description: event.target.value})} /></div>
          </div>
      </div>
    </>
  );
}
export default UpdateProfileForm;