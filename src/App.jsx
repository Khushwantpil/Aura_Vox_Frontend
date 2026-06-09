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
export const ServerURL = "http://localhost:8000";
export const CLIENT_URL = "http://localhost:5173"
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${ServerURL}/api/user/current-user`, { withCredentials: true });
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setLoading(false); 
      } 
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f8fc]">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"/>
      </div>
    );
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