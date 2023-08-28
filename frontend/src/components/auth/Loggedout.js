import { Link } from 'react-router-dom';

// страница на которую редиректит в случае перехода анонимусом на приват контент
const Loggedout = () => {
  return (
    <div>
      <h1>ты разлогинен, войди</h1>
      <li>
        <Link to="/login">войти</Link>
      </li>
      <li>
        <Link to="/">На Главную</Link>
      </li>
    </div>
  );
};
  
export default Loggedout;