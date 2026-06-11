import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './Pages/home';
import Login from './Pages/login';
import Builder from './Pages/Builder';
import Billing from './Pages/billing';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/protectedRoute';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';
export const ServerURL = import.meta.env.VITE_SERVER_URL || "https://aura-vox-backend.onrender.com";
export const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || "https://aura-vox-frontend.vercel.app";
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${ServerURL}/api/user/current-user`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      } 
    };

    const minLoadTime = new Promise(resolve => setTimeout(resolve, 5000));

    Promise.all([fetchCurrentUser(), minLoadTime]).then(() => {
      setIsExiting(true);
      setTimeout(() => {
        setLoading(false);
      }, 500); // Wait for the fade-out transition to complete
    });
  }, []);

  if (loading) {
    return <Loader isExiting={isExiting} />;
  }

  return (
    <>
      <Toaster position="top-right"/>
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        
        <Route
          path='/*'
          element={
            <ProtectedRoute user={user} loading={loading}>
              <div className="min-h-screen flex flex-col bg-[#f8fafc]">
                <Navbar user={user} setUser={setUser} />
                <div className="flex-grow container mx-auto px-4 py-8">
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/builder' element={<Builder user={user} setUser={setUser} />} />
                    <Route path='/billing' element={<Billing user={user} setUser={setUser} />} />
                    <Route path='*' element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
