import React from "react";
import MembersRouter from "./components/routes/Routing";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage/Main";


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