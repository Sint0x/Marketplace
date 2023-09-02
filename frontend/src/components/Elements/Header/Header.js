import './style.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const logo = require('../../../images/6786587.png');

export default function Header() {
    const [username, setUsername] = useState('логин');
    const [userId, setUserId] = useState(null);
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
                    setUserId(data.user_id);
                });
        }
    }, []);

    const handleImageClick = () => {
        navigate('/');
    }

    const handleUsernameClick = () => {
        if (username === 'логин') {
            console.log(username)
            navigate('/login');
        } else {
            console.log(username)
            navigate(`/profile/${userId}`);
            window.location.reload();
        }
    }

    return (
        <>
            <div className="header" style={{ zIndex: 9999 }}>
                <div style={{ position: 'relative', width: '1200px'}}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <img onClick={handleImageClick} style={{  cursor: 'pointer' }} src={logo} alt="" />
                            <h1 onClick={handleImageClick} style={{ marginTop: '-37px', marginLeft: '-24px', fontSize: '21px', cursor: 'pointer', backgroundImage: 'linear-gradient(to top, black 20%, white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: 'Comic Sans MS' }}>
                                mar...ket.co
                            </h1>
                        </div>
                        <div>
                            <h1 onClick={handleUsernameClick} style={{ marginTop: '15px',  cursor: 'pointer', maxWidth: 'auto', minWidth: '50px', height: '50px', marginfontFamily: 'COMIC SANS MS', backgroundImage: 'linear-gradient(to top, black 50%, white)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {username === 'логин' ? 'Войти' : username}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}