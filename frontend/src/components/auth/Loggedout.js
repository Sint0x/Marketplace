import Header from '../Elements/Header/Header';


// страница на которую редиректит в случае перехода анонимусом на приват контент
const Loggedout = () => {
  return (
    <>
        <Header />
        <div className="center">
            <div className="box" style={{ color: 'white', textAlign: 'center' }}>
                <h1>РАЗЛОГИНЕН, ВОЙДИ. КНОПКА В ХЕДЕРЕ</h1>
            </div>
        </div>
    </>
  );
}
export default Loggedout;