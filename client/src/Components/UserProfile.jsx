import React from "react";
import { motion } from "framer-motion";
import {
  User,
  Star,
  Zap,
  Award,
  Shield,
  Trophy,
  Edit,
  LogOut
} from "lucide-react";

/* ======================================================
   ICON MAPPER
====================================================== */
const iconMap = {
  User,
  Star,
  Zap,
  Award,
  Shield,
  Trophy
};

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function UserProfile({ user, setUser }) {
  /* -------------------------------
     AUTH SAFETY
  -------------------------------- */
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Please login to view your profile
      </div>
    );
  }

  /* -------------------------------
     DATA NORMALIZATION
  -------------------------------- */
  const fullName = user.fullName || "Player";
  const profile = user.profile || {};
  const stats = user.stats || {};
  const badges = user.badges || [];

  const AvatarIcon = iconMap[profile.avatarIcon] || User;

  const level = stats.level ?? 1;
  const totalXP = stats.totalXP ?? 0;
  const currentStreak = stats.currentStreak ?? 0;
  const totalWins = stats.totalWins ?? 0;

  const xpRequired = level * 1000;
  const progress = Math.min(
    Math.round((totalXP / xpRequired) * 100),
    100
  );

  /* -------------------------------
     LOGOUT HANDLER
  -------------------------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  /* ======================================================
     UI
  ====================================================== */
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white py-16 px-6 md:px-16 lg:px-28">

      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-16"
      >
        <div>
          <h1 className="text-5xl font-bold drop-shadow-[0_0_20px_rgba(0,120,255,0.5)]">
            Player Profile
          </h1>
          <p className="text-gray-400 mt-2">
            Your stats. Your achievements. Your dominance.
          </p>
        </div>

        <div className="flex gap-3 mt-6 md:mt-0">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 transition">
            <Edit size={18} />
            Edit
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600/20 border border-red-500/40 hover:bg-red-600/30 transition text-red-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* ================= LEFT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#11121a] p-8 rounded-3xl border border-blue-500/20"
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center shadow-lg">
              <AvatarIcon size={60} />
            </div>

            <h2 className="text-3xl font-bold mt-6">
              {fullName}
            </h2>

            <p className="text-gray-400">
              @{profile.username || "username"}
            </p>

            <div className="mt-6 px-6 py-2 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold">
              {profile.rank || "Bronze"} Rank
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <Stat label="Total XP" value={totalXP} />
            <Stat label="Battles Won" value={totalWins} />
            <Stat label="Current Streak" value={`${currentStreak} 🔥`} />
            <Stat label="Account Level" value={`Lv. ${level}`} />
          </div>
        </motion.div>

        {/* ================= RIGHT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lg:col-span-2 bg-[#11121a] p-10 rounded-3xl border border-blue-500/20"
        >

          {/* XP PROGRESS */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Level {level}</span>
              <span>
                {totalXP} / {xpRequired} XP
              </span>
            </div>

            <div className="w-full h-4 bg-[#0d0f15] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1 }}
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              />
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <h3 className="text-xl font-semibold mb-4">
            Achievements
          </h3>

          {badges.length === 0 ? (
            <p className="text-gray-400">
              No achievements unlocked yet
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {badges.map((badge) => {
                const Icon = iconMap[badge.icon] || Trophy;
                return (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#0d0f15] p-6 rounded-2xl border border-blue-500/20 text-center"
                  >
                    <Icon size={32} className="mx-auto text-blue-400" />
                    <p className="mt-2 text-sm text-gray-300">
                      {badge.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

/* ======================================================
   REUSABLE STAT COMPONENT
====================================================== */
function Stat({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300">
      <span>{label}</span>
      <span className="text-blue-400 font-bold">
        {value}
      </span>
    </div>
  );
}