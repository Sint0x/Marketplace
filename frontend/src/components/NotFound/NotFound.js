import Header from '../Elements/Header/Header';
const NotFound = () => {
    return (
      <>
          <Header />
          <div className="center" style={{ display: 'flex' }}>
              <div className="box" style={{ color: 'white', textAlign: 'center', fontFamily: 'Verdana' }}>
                  <h1>404 PAGE NOT FOUND</h1>
              </div>
          </div>
      </>
  );
}
export default NotFound;