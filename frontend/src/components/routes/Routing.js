import React from "react";
import Auth from "../auth/Auth";
import { Routes, Route } from 'react-router-dom';
import MainPage from "../MainPage/Main";
import Profile from "../Profile/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import AnonymousRoute from "../routes/AnonymousRoute";
import Loggedout from "../auth/Loggedout";
import UpdateProfileForm from "../Profile/EditProfile";
import AddGoodForm from "../Product/GoodAdd";
import ProductPage from "../Product/ProductPage";



//роуты
export default function MembersRouter() {
  return (
      <Routes>
        <Route path="/login" element={<AnonymousRoute><Auth /></AnonymousRoute>} />
        <Route path="/testoken" element={<MainPage />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/profile/edit" element={<PrivateRoute><UpdateProfileForm /></PrivateRoute>} />
        <Route path="/creategood" element={<AddGoodForm />} />
        <Route path="/Loggedout" element={<Loggedout />} />
        <Route exact path="/product/:id" element={<ProductPage />} />
      </Routes>
  );
}