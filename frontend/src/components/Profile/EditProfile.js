import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("key");
    fetch(`http://127.0.0.1:8000/api/user/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setInitialData(data);
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
            myImage = require('./../../images/Placeholder-1.png');
        }
        setPreviewImage(myImage);
      });
    }, []);

  if (!formData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObj = new FormData();
    if (formData.first_name !== initialData.first_name) {
      formDataObj.append('first_name', formData.first_name);
    }
    if (formData.last_name !== initialData.last_name) {
      formDataObj.append('last_name', formData.last_name);
    }
    if (formData.profile_description !== initialData.profile_description) {
      formDataObj.append('profile_description', formData.profile_description);
    }
    if (profileImage) {
      formDataObj.append('profile_image', profileImage);
    }
    try {
      const token = localStorage.getItem("key");
      const response = await fetch(`http://127.0.0.1:8000/api/user/${id}/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`
        },
        body: formDataObj
      });
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
    navigate(`/profile/${id}`);
    window.location.reload();

  }

  const handleCancelClick = () => {
    navigate(`/profile/${id}`);
    window.location.reload();
  }

  return (
    <>
      <Header />
      <div className="center">
          <div className="box">
              <div className="profile">
                  <div className="avatarblock"><img className="avatar" style={{ maxWidth: '300px' }} src={previewImage || profileImage} alt="" /></div>
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
              <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'end' }}><input style={{ width: '110px', height: '20px' }} type="file" className='chousefile' onChange={event => {if(event.target.files[0]) {setPreviewImage(URL.createObjectURL(event.target.files[0])); setProfileImage(event.target.files[0])}}} /></div>
              <div className="name"><textarea style={{fontSize: "20px"}} className="textarea-inputs" cols="80vh" rows="5" name="profile_description" type="text" placeholder='описание профиля'value={formData.profile_description} onChange={event => setFormData({...formData, profile_description: event.target.value})} /></div>
          </div>
      </div>
    </>
  );
}
export default UpdateProfileForm;
