import React, { useEffect, useMemo, useState } from "react";
import {
  Trophy,
  Medal,
  Star,
  Users,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

/* ======================================================
   BACKEND-STYLE RESPONSE (SAMPLE)
====================================================== */
const LEADERBOARD_API_RESPONSE = {
  leaders: [
    {
      _id: "u1",
      rank: 1,
      name: "Aarav Sharma",
      xp: 9820,
      wins: 134,
      streak: 28,
      badges: 12,
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
      _id: "u2",
      rank: 2,
      name: "Meera Patel",
      xp: 9100,
      wins: 120,
      streak: 18,
      badges: 10,
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      _id: "u3",
      rank: 3,
      name: "Rahul Verma",
      xp: 8760,
      wins: 102,
      streak: 14,
      badges: 9,
      avatar: "https://i.pravatar.cc/150?img=48",
    },
  ],
  list: Array.from({ length: 15 }).map((_, idx) => ({
    _id: `u${idx + 4}`,
    rank: idx + 4,
    name: `Player ${idx + 4}`,
    xp: 6000 - idx * 100,
    wins: 40 + idx,
    streak: Math.floor(Math.random() * 10),
    badges: Math.floor(Math.random() * 5),
    avatar: `https://i.pravatar.cc/150?img=${idx + 5}`,
  })),
};

/* ======================================================
   FAKE FETCH (REPLACE WITH REAL API)
====================================================== */
function fetchLeaderboard() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(LEADERBOARD_API_RESPONSE), 400);
  });
}

/* ======================================================
   COMPONENT
====================================================== */
export default function Leadersection() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("xp"); // xp | streak

  useEffect(() => {
    fetchLeaderboard().then(setData);
  }, []);

  const filteredList = useMemo(() => {
    if (!data) return [];

    let list = [...data.list];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sort === "xp") {
      list.sort((a, b) => b.xp - a.xp);
    }

    if (sort === "streak") {
      list.sort((a, b) => b.streak - a.streak);
    }

    return list;
  }, [data, query, sort]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-gray-400 flex items-center justify-center">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-10">

      {/* Header */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400 mb-3">
          Global Leaderboard
        </h1>
        <p className="text-gray-400 text-center max-w-xl">
          Rankings fetched dynamically from backend data.
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {data.leaders.map((player) => (
          <div
            key={player._id}
            className={`bg-[#111622] rounded-2xl p-6 border-2 shadow-xl flex flex-col items-center text-center ${
              player.rank === 1 ? "border-yellow-400" : "border-blue-600"
            }`}
          >
            {player.rank === 1 && <Trophy size={40} className="text-yellow-400 mb-3" />}
            {player.rank === 2 && <Medal size={40} className="text-gray-300 mb-3" />}
            {player.rank === 3 && <Star size={40} className="text-orange-400 mb-3" />}

            <img
              src={player.avatar}
              alt={player.name}
              className="w-24 h-24 rounded-full border-4 border-blue-600 mb-4"
            />

            <h2 className="text-xl font-semibold">{player.name}</h2>
            <p className="text-blue-300 text-sm mb-3">Rank #{player.rank}</p>

            <div className="w-full bg-[#0A0E17] p-4 rounded-xl mt-auto">
              <p className="text-sm">XP: {player.xp}</p>
              <p className="text-sm">Wins: {player.wins}</p>
              <p className="text-sm">Streak: {player.streak}🔥</p>
              <p className="text-sm">Badges: {player.badges}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <input
          placeholder="Search players..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-[#111622] border border-gray-700 rounded-xl px-4 py-3 w-full md:w-72"
        />

        <div className="flex gap-3">
          <button className="px-4 py-3 rounded-xl bg-[#111622] border border-gray-700 flex items-center">
            <Users size={18} className="mr-2" /> Global
          </button>
          <button
            onClick={() => setSort("streak")}
            className="px-4 py-3 rounded-xl bg-[#111622] border border-gray-700 flex items-center"
          >
            <ChevronUp size={18} className="mr-2" /> Top Streak
          </button>
          <button
            onClick={() => setSort("xp")}
            className="px-4 py-3 rounded-xl bg-[#111622] border border-gray-700 flex items-center"
          >
            <ChevronDown size={18} className="mr-2" /> XP Sort
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111622] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-[#0A0E17] text-gray-300">
            <tr>
              <th className="py-4 px-6">Rank</th>
              <th className="py-4 px-6">Player</th>
              <th className="py-4 px-6">XP</th>
              <th className="py-4 px-6">Wins</th>
              <th className="py-4 px-6">Streak</th>
              <th className="py-4 px-6">Badges</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((player) => (
              <tr key={player._id} className="border-b border-gray-800">
                <td className="py-4 px-6 font-semibold">#{player.rank}</td>
                <td className="py-4 px-6 flex items-center gap-3">
                  <img
                    src={player.avatar}
                    alt={player.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {player.name}
                </td>
                <td className="py-4 px-6 text-blue-300 font-semibold">
                  {player.xp}
                </td>
                <td className="py-4 px-6">{player.wins}</td>
                <td className="py-4 px-6">{player.streak}🔥</td>
                <td className="py-4 px-6">{player.badges}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
