import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




function Profile() {
    const [userData, setUserData] = useState(null);

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
    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>First name: {userData.first_name}</p>
            <p>Last name: {userData.last_name}</p>
            <p>Profile description: {userData.profile_description}</p>
            <li>
              <Link to="/">На Главную</Link>
            </li>
        </div>
    );
}

export default Profile;
