import React from "react";
import Auth from "../auth/Auth";
import { Routes, Route } from 'react-router-dom';
import NotFound from "../NotFound/NotFound";
import MainPage from "../MainPage/Main";
import Profile from "../Profile/Profile";
import PrivateRoute from "../routes/PrivateRoute";
import AnonymousRoute from "../routes/AnonymousRoute";
import Loggedout from "../auth/Loggedout";
import UpdateProfileForm from "../Profile/EditProfile";
import AddGoodForm from "../Product/GoodAdd";
import ProductPage from "../Product/ProductPage";
import AllUserProducts from "../Profile/Elements/AllUserProducts";
import ProductSellerReviews from "../Profile/Elements/ProductSellerReviews";
import AllSellerReviews from "../Profile/Elements/AllUserReviews";

//роуты
export default function MembersRouter() {
  return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<AnonymousRoute><Auth /></AnonymousRoute>} />
        <Route path="/testoken" element={<MainPage />} />
        <Route exact path="/profile/:id" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route exact path="/profile/:id/edit" element={<PrivateRoute><UpdateProfileForm /></PrivateRoute>} />
        <Route path="/creategood" element={<AddGoodForm />} />
        <Route path="/Loggedout" element={<Loggedout />} />
        <Route exact path="/product/:id" element={<ProductPage />} />
        <Route exact path="/profile/:id/products" element={<PrivateRoute><AllUserProducts /></PrivateRoute>} />
        <Route exact path="/profile/:id/sellereviews" element={<ProductSellerReviews />} />
        <Route exact path="/profile/:id/allsellereviews" element={<AllSellerReviews />} />
      </Routes>
  );
}