import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AllPage from "./pages/AllPage";
import AdoptedPage from "./pages/AdoptedPage";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./index.js";
import ProfilePage from "./pages/ProfilePage";



function App() {

  const { setUser,isAuthenticated, setIsAuthenticated } = useContext(Context);

  useEffect(() => {
    
    axios
      .get(`${server}/users/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        
      });
  }, [isAuthenticated]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/all" element={<AllPage />} />
        <Route path="/my" element={<AdoptedPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
