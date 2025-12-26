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

import Friends from './Components/Friends'; 

import './components/MusicControls.css'; // Add this line
import { MusicProvider, MusicControls } from './Components/BackgroundMusic'; // Add this line
import AutoPlayOverlay from './Components/AutoPlayOverlay';
import useSound from './Components/useSound';

import ProtectedRoute from "./Components/ProtectedRoute";

import Games from './pages/DashBoard/Games';


import Memory from './pages/Games/Memory';
import MemoryGame from './pages/Games/MemoryMatch';

import Reflex from './pages/Games/Reflex';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // ⏳ auth check in progress
  const location = useLocation();

    // 🔁 RESTORE USER ON PAGE REFRESH / HARD RELOAD
 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setAuthLoading(false); // ❌ no token, stop loading
    return;
  }

  fetch("http://localhost:9000/api/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid token");
      return res.json();
    })
    .then((data) => {
      setUser(data.user);       // ✅ restore user
      setAuthLoading(false);    // ✅ auth check complete
    })
    .catch(() => {
      localStorage.removeItem("token");
      setUser(null);
      setAuthLoading(false);    // ❌ auth failed, stop loading
    });
}, []);



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

  // const isgamesPage = location.pathname.startsWith("/memory","/memorymatch");
  const isgamesPage = location.pathname.startsWith("/memory") || 
                      location.pathname.startsWith("/memorymatch") || 
                      location.pathname.startsWith("/reflex") ;


  return (
    <>
      {/* LOGIN POPUP */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} setUser={setUser} />}

      {/* NAVBAR - only if not dashboard */}
      {!isDashboard && !isgamesPage && (
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

        <Route path="memory" element={<Memory />} />
        <Route path="memorymatch" element={<MemoryGame user={user} />} />
        <Route path="reflex" element={<Reflex/>} />

        {/* Dashboard with nested routes */}
        {/* <Route path="/dashboard" element={  <DashboardLayout user={user} />}> */}
        <Route path="/dashboard" element={ <ProtectedRoute user={user} authLoading={authLoading} ><DashboardLayout user={user} /></ProtectedRoute> }>
          <Route index element={<DashboardArena />} />
          <Route path="duel" element={<PlayDuel />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="chat" element={<Chat />} />
          <Route path="friends" element={<Friends />} />
          <Route path="games" element={<Games />} />

          

        </Route>
      </Routes>

      {/* FOOTER - only if not dashboard */}
      {!isDashboard && !isgamesPage && <Footer />}
    </>
  );
}


export default App

