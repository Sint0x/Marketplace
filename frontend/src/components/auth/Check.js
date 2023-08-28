
// проверка юзера на наличие и верность токена
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
