import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";


const App = () => {

  const [token, setToken] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setToken(storedToken);
  }, []);
  return (
    <div>
      <Routes >

        <Route
          path="/"
          element={token ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App