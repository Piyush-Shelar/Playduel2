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
export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await fetch("http://localhost:9000/users/m@123");
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, []);

  /* ================= STATES ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  /* ================= SAFE NORMALIZATION ================= */
  const {
    user = {},
    badges = []
  } = profile || {};

  const {
    name = "",
    username = "",
    rank = "Bronze",
    avatarIcon = "User",
    stats = {}
  } = user;

  const {
    totalXP = 0,
    xpRequired = 1000,
    quizBattlesWon = 0,
    currentStreak = 0,
    accountLevel = 1
  } = stats;

  const AvatarIcon = iconMap[avatarIcon] || User;

  const progress = Math.min(
    100,
    Math.round((totalXP / xpRequired) * 100)
  );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white py-16 px-6 md:px-16 lg:px-28">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center mb-16"
      >
        <div>
          <h1 className="text-5xl font-bold">
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

        {/* LEFT PANEL */}
        <div className="bg-[#11121a] p-8 rounded-3xl border border-blue-500/20">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center">
              <AvatarIcon size={60} />
            </div>

            <h2 className="text-3xl font-bold mt-6">{name}</h2>
            <p className="text-gray-400">@{username}</p>

            <div className="mt-6 px-6 py-2 rounded-full bg-blue-600/20 text-blue-300">
              {rank} Rank
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <Stat label="Total XP" value={totalXP} />
            <Stat label="Quiz Battles Won" value={quizBattlesWon} />
            <Stat label="Current Streak" value={`${currentStreak} 🔥`} />
            <Stat label="Account Level" value={`Lv. ${accountLevel}`} />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 bg-[#11121a] p-10 rounded-3xl border border-blue-500/20">
          {/* XP BAR */}
          <div className="mb-10">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Level {accountLevel}</span>
              <span>{totalXP} / {xpRequired} XP</span>
            </div>

            <div className="w-full h-4 bg-[#0d0f15] rounded-full">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* BADGES */}
          <h3 className="text-xl font-semibold mb-4">Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {badges.map((badge) => {
              const Icon = iconMap[badge.icon] || Trophy;
              return (
                <div
                  key={badge.id}
                  className="bg-[#0d0f15] p-6 rounded-2xl text-center"
                >
                  <Icon size={32} className="mx-auto text-blue-400" />
                  <p className="mt-2 text-sm text-gray-300">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ================= STAT ================= */
function Stat({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300">
      <span>{label}</span>
      <span className="text-blue-400 font-bold">{value}</span>
    </div>
  );
}
