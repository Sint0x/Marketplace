import React from "react";
import MembersRouter from "./components/routes/Routing";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage/Main";
import GoodsCard from "./components/Goods/GoodsCard";

// import PrivateRoute from "./components/routes/PrivateRoute";
// import Profile from "./components/Profile/Profile";
// Элемент <MembersRouter /> добавляет маршруты из другого файла с функцией, возвращающей основные маршруты
// Эта функция отвечайт за настройку маршрутов, а так же является контроллером react-приложения
// <Route path="/" element={<MainPage />} /> - является маршрутом


export default function App() {
  return (  
    <Router>
      <MembersRouter />
      <Routes>
        <Route exat path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}