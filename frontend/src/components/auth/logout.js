
//кнопка, которая удаляет токен из локального хранилица
export default function LogoutButton() {
    function handleLogout() {
        localStorage.removeItem('key');
        window.location.reload();
    }

    return (
        <button onClick={handleLogout}>Выйти</button>
    );
}