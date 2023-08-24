async function checkToken() {
  const token = localStorage.getItem('key');
  const response = await fetch('http://127.0.0.1:8000/api/tokencheck', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  const data = await response.json();
  return data.result;
}

export default checkToken;



















// import { useHistory } from 'react-router-dom';

// const checkToken = async () => {
//   const history = useHistory();
//   try {
//     const response = await fetch('/tokencheck');
//     if (response.ok) {
//       const data = await response.json();
//       if (data.message) {
//         return true;
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
//   history.push('/loggedout');
//   return false;
// };