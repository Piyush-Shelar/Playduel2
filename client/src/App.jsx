import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

/* Pages */
import LandingPage from "./pages/LandingPage";
import LeaderBoard from "./pages/LeaderBoard";
import DashboardLayout from "./pages/DashBoard/DashboardLayout";
import DashboardArena from "./pages/DashBoard/DashBoardArena";
import PlayDuel from "./pages/DashBoard/PlayDuel";
import Games from "./pages/DashBoard/Games";
import Chat from "./pages/Chat";

/* Components */
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LoginPopup from "./Components/LoginPopup";
import UserProfile from "./Components/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Features from "./Components/Features";
import Pricing from "./Components/Pricing";
import Friends from "./Components/Friends";
import Memory from './pages/Games/Memory';
import MemoryGame from './pages/Games/MemoryMatch';
import Reflex from './pages/Games/Reflex';
import Lazer from './pages/Games/Lazer';

import AppProvider from './Components/Appcontext';
import Invitefriends from './Components/Invitefriends';
import { SocketProvider } from './Components/SocketContext';
import InviteModal from './Components/InviteModal';
import Duel from './Components/Duel';
import Duelresult from './Components/Duelresult';


function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const location = useLocation();
  const API = import.meta.env.VITE_API_BASE_URL;

  /* ======================================================
     AUTH RESTORE (SINGLE SOURCE OF TRUTH)
  ====================================================== */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthLoading(false);
      return;
    }

    fetch(`${API}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then((data) => {
        const fullUser = {
          id: data._id,
          fullName: data.fullName,
          email: data.email,
          profile: data.profile,
          stats: data.stats,
          badges: data.badges,
        };

        setUser(fullUser);
        localStorage.setItem("user", JSON.stringify(fullUser));
        setAuthLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setAuthLoading(false);
      });
  }, [API]);

  /* ======================================================
     UI EFFECTS
  ====================================================== */
  useEffect(() => {
    setShowLogin(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = showLogin ? "hidden" : "auto";
  }, [showLogin]);

  /* ======================================================
     ROUTE HELPERS
  ====================================================== */
  const isDashboard = location.pathname.startsWith("/dashboard");

  // const isgamesPage = location.pathname.startsWith("/memory","/memorymatch");
  const isGamePage = location.pathname.startsWith("/memory") || 
                      location.pathname.startsWith("/memorymatch") || 
                      location.pathname.startsWith("/reflex") || 
                      location.pathname.startsWith("/lazer") ;


  return (
    <>
      <SocketProvider>
      
      
     <AppProvider>
      <InviteModal />
      {/* LOGIN POPUP */}
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} setUser={setUser} />
      )}

      {/* NAVBAR */}
      {!isDashboard && !isGamePage && (
        <Navbar
          user={user}
          setUser={setUser}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
      )}

      {/* ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              user={user}
              setUser={setUser}
              showLogin={showLogin}
              setShowLogin={setShowLogin}
            />
          }
        />

        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
         <Route path="/" element={<LandingPage />} />
        <Route path="/invitefriends" element={<Invitefriends/>}/>
        <Route path="/duel" element={<Duel />} />
        <Route path="/duelresult/:roomId" element={<Duelresult />} />


        {/* PROFILE (PUBLIC PATH) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user} authLoading={authLoading}>
              <UserProfile user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />

        <Route path="memory" element={<Memory />} />
        <Route path="memorymatch" element={<MemoryGame user={user} />} />
        <Route path="reflex" element={<Reflex/>} />
        <Route path='lazer' element={<Lazer />} />


        {/* DASHBOARD */}
       <Route
  path="/dashboard"
  element={
    <ProtectedRoute user={user} authLoading={authLoading}>
      <DashboardLayout user={user} setUser={setUser} />
    </ProtectedRoute>
  }
>
          <Route index element={<DashboardArena />} />
          <Route path="duel" element={<PlayDuel />} />
          <Route
            path="profile"
            element={<UserProfile user={user} setUser={setUser} />}
          />
          <Route path="chat" element={<Chat />} />
          <Route path="friends" element={<Friends />} />
          <Route path="games" element={<Games />} />
        </Route>
      </Routes>

      {/* FOOTER */}
      {!isDashboard && !isGamePage && <Footer />}
      </AppProvider>
      </SocketProvider>
    </>
  );
}

export default App;
