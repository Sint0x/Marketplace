import './style.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const myImage = require('./6786587.png');

export default function Header() {
    const [username, setUsername] = useState('логин');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('key');
        if (token) {
            fetch('http://127.0.0.1:8000/api/tokencheck', {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
                .then((response) => response.json())
                .then((data) => {
                    setUsername(data.username);
                });
        }
    }, []);

    const handleImageClick = () => {
        navigate('/');
    }

    const handleUsernameClick = () => {
        if (username === 'логин') {
            navigate('/login');
        } else {
            navigate('/profile');
        }
    }

    return (
        <>
            <nav className="header" style={{ position: 'fixed', top: 0, height: '59px', display: 'flex', justifyContent: 'space-between', zIndex: 9999 }}>
                <h1 style={{ marginLeft: '37vh' }}><img onClick={handleImageClick} style={{ marginTop: '-10px', cursor: 'pointer' }} src={myImage} alt="" /></h1>
                <h1 onClick={handleUsernameClick} style={{ fontFamily: 'COMIC SANS MS', float: 'right', marginRight: '22vh', width: '200px', height: '50px', backgroundImage: 'linear-gradient(to top, black 50%, white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', cursor: 'pointer' }}>{username === 'логин' ? 'Войти' : username}</h1>
            </nav>
        </>
    );
}