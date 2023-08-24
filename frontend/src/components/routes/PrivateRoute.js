import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import checkToken from "../auth/Check";


// async function checkToken() {
//   const token = localStorage.getItem('key');
//   const response = await fetch('http://127.0.0.1:8000/api/tokencheck', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Token ${token}`
//     }
//   });
//   const data = await response.json();
//   return data.result;
// }




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




































// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// export default function PrivateRoute({ children }) {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("key");
//     console.log(token)
//     fetch('http://127.0.0.1:8000/api/tokencheck', {
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//         'Authorization': `Token ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data.result)
//         if (data.result === true) {
//           setAuth(true);
//         } else {
//           setAuth(false);
//         }
//       });
//   }, []);
//   if (!auth) {
//     return <Navigate to="/logout" />;
//   }

//   return children;
// }



// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// export default function PrivateRoute({ children }) {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/tokencheck')
//       .then((response) => response.json())
//       .then((data) => {
//         setAuth(data.result);
//       });
//   }, []);

//   if (!auth) {
//     return <Navigate to="/logout" />;
//   }
//   return children;
// }


// import React from "react";
// import { Navigate } from "react-router-dom";



// export default function PrivateRoute({ children }) {
//   const auth = false;
//   if (!auth) {
//     return <Navigate to="/logout" />;
//   }

//   return children;
// }
