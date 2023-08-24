import React from "react";
import Auth from "../auth/Auth"; // в данном импорте Auth является компонентом, импортированым из файла по пути.
                                  // Auth - название функции в том файле, возвращиющий компонент
import { Routes, Route } from 'react-router-dom';
import MainPage from "../MainPage/Main";
import Profile from "../Profile/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import AnonymousRoute from "../routes/AnonymousRoute";
import Loggedout from "../auth/Loggedout";
// в этой функции обьявлены маршруты, использующиеся в App.js при помощи export default(импорта)
// element={<Login />} рендерит в index.html элемент Login
export default function MembersRouter() {
  return (
      <Routes>
        <Route path="/login" element={<AnonymousRoute><Auth /></AnonymousRoute>} />
        <Route path="/testoken" element={<MainPage />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/Loggedout" element={<Loggedout />} />
      </Routes>
  );
}