import React, { useState } from "react";

export default function ViewPlayers() {
  // 🔥 Mock player data (replace with API later)
  const [players] = useState([
    {
      id: 1,
      username: "NeoKnight",
      email: "neo@skillduel.com",
      xp: 1840,
      level: 12,
      status: "online",
      wins: 42,
      losses: 18,
    },
    {
      id: 2,
      username: "ShadowByte",
      email: "shadow@skillduel.com",
      xp: 1320,
      level: 9,
      status: "offline",
      wins: 29,
      losses: 21,
    },
    {
      id: 3,
      username: "PixelQueen",
      email: "pixel@skillduel.com",
      xp: 2560,
      level: 18,
      status: "online",
      wins: 61,
      losses: 14,
    },
  ]);

  return (
    <div className="text-white space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#1f5cff]">
          👥 Players Overview
        </h1>
        <p className="text-white/60">
          Monitor player activity, progress and performance
        </p>
      </div>

      {/* PLAYER GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {players.map((player) => (
          <div
            key={player.id}
            className="bg-[#0d1528] border border-white/10 rounded-2xl p-6 hover:border-[#1f5cff] transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="font-bold text-lg">{player.username}</h2>
                <p className="text-sm text-white/50">{player.email}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  player.status === "online"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-gray-500/20 text-gray-400"
                }`}
              >
                {player.status}
              </span>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="bg-black/40 rounded-lg p-3">
                <p className="text-white/50">XP</p>
                <p className="font-bold text-[#1f5cff]">{player.xp}</p>
              </div>

              <div className="bg-black/40 rounded-lg p-3">
                <p className="text-white/50">Level</p>
                <p className="font-bold">{player.level}</p>
              </div>

              <div className="bg-black/40 rounded-lg p-3">
                <p className="text-white/50">Wins</p>
                <p className="font-bold text-green-400">{player.wins}</p>
              </div>

              <div className="bg-black/40 rounded-lg p-3">
                <p className="text-white/50">Losses</p>
                <p className="font-bold text-red-400">{player.losses}</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button className="flex-1 bg-[#1f5cff] text-black font-semibold py-2 rounded-lg hover:opacity-90">
               🫵 View Profile
              </button>
              <button className="flex-1 bg-white/10 py-2 rounded-lg hover:bg-white/20">
               🚫 Ban
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
