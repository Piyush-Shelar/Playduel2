import './App.css';

import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LeaderBoard from "./pages/LeaderBoard";
import UserProfile from "./Components/UserProfile";


import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPopup from "./Components/LoginPopup";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Features from "./Components/Features";
import Pricing from "./Components/Pricing";
import DashboardLayout from "./pages/DashBoard/DashboardLayout";
import PlayDuel from "./pages/DashBoard/PlayDuel";
import Chat from "./pages/Chat";
import DashboardArena from "./pages/DashBoard/DashBoardArena";



import './components/MusicControls.css'; // Add this line
import { MusicProvider, MusicControls } from './Components/BackgroundMusic'; // Add this line
import AutoPlayOverlay from './Components/AutoPlayOverlay';
import useSound from './Components/useSound';






function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  // Close login on route change
  useEffect(() => {
    setShowLogin(false);
  }, [location.pathname]);

  // Prevent scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  // Check if current route is a dashboard route
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* LOGIN POPUP */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setUser={setUser} />}

      {/* NAVBAR - only if not dashboard */}
      {!isDashboard && (
        <Navbar
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          user={user}
          setUser={setUser}
        />
      )}

      {/* MAIN ROUTES */}
      <Routes>
        <Route
          path="/"
          element={<LandingPage user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} />}
        />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/home" element={<LandingPage />} />

        <Route
          path="/profile"
          element={user ? <UserProfile user={user} /> : <LandingPage user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin} />}
        />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<DashboardLayout user={user} />}>
          <Route index element={<DashboardArena />} />
          <Route path="duel" element={<PlayDuel />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>

      {/* FOOTER - only if not dashboard */}
      {!isDashboard && <Footer />}
    </>
  );
}


export default App

