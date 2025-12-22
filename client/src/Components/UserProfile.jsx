import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Star,
  Zap,
  Award,
  Shield,
  Trophy,
  Edit
} from "lucide-react";

/* ======================================================
   ICON MAPPER (JSON → COMPONENT)
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
   SAMPLE API RESPONSE (REPLACE WITH REAL API LATER)
====================================================== */
const SAMPLE_PROFILE_DATA = {
  user: {
    id: "u001",
    name: "Madhur",
    username: "m_123",
    rank: "Diamond",
    avatarIcon: "User",
    stats: {
      totalXP: 14500,
      xpRequired: 16000,
      quizBattlesWon: 82,
      currentStreak: 7,
      accountLevel: 23
    }
  },
  badges: [
    { id: 1, icon: "Trophy", label: "Battle Master" },
    { id: 2, icon: "Zap", label: "Fast Thinker" },
    { id: 3, icon: "Star", label: "Top 1% Player" },
    { id: 4, icon: "Award", label: "Accuracy 90%+" },
    { id: 5, icon: "Shield", label: "Unstoppable" },
    { id: 6, icon: "User", label: "Veteran Player" }
  ]
};

/* ======================================================
   FAKE FETCH (SIMULATES BACKEND CALL)
====================================================== */
function fetchUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_PROFILE_DATA);
    }, 600);
  });
}

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function UserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile().then((data) => setProfile(data));
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading Profile...
      </div>
    );
  }

  const { user, badges } = profile;
  const AvatarIcon = iconMap[user.avatarIcon];
  const progress = Math.round(
    (user.stats.totalXP / user.stats.xpRequired) * 100
  );

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

        <button className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600/20 border border-blue-500/40">
          <Edit size={18} /> Edit Profile
        </button>
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

            <h2 className="text-3xl font-bold mt-6">{user.name}</h2>
            <p className="text-gray-400">@{user.username}</p>

            <div className="mt-6 px-6 py-2 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-300 font-semibold">
              {user.rank} Rank
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <Stat label="Total XP" value={user.stats.totalXP} />
            <Stat label="Quiz Battles Won" value={user.stats.quizBattlesWon} />
            <Stat label="Current Streak" value={`${user.stats.currentStreak} 🔥`} />
            <Stat label="Account Level" value={`Lv. ${user.stats.accountLevel}`} />
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
              <span>Level {user.stats.accountLevel}</span>
              <span>
                {user.stats.totalXP} / {user.stats.xpRequired} XP
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
          <h3 className="text-xl font-semibold mb-4">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const Icon = iconMap[badge.icon];
              return (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#0d0f15] p-6 rounded-2xl border border-blue-500/20 text-center"
                >
                  <Icon size={32} className="mx-auto text-blue-400" />
                  <p className="mt-2 text-sm text-gray-300">{badge.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================= REUSABLE STAT COMPONENT ================= */
function Stat({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300">
      <span>{label}</span>
      <span className="text-blue-400 font-bold">{value}</span>
    </div>
  );
}
