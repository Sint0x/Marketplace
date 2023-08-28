import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import checkToken from "../auth/Check";


// обработка роутов страниц для юзеров
export default function PrivateRoute({ children }) {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const result = await checkToken();
      setAuth(result);
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth) {
    return <Navigate to="/Loggedout" />;
  }

  return children;
}
