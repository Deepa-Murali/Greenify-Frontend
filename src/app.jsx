import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import TreeMap from './components/treemap';
import Gallery from './pages/GalleryPage';
import About from './pages/about';
import Profile from './pages/ProfilePage';
import Navbar from './components/navbar';
import GrowthUpdatePage from './pages/GrowthUpdatePage'; 
import AdminDashboard from './pages/AdminDashboard';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/map" element={<TreeMap />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track" element={<GrowthUpdatePage />} /> 
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
