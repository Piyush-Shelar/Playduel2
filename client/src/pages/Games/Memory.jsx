import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MemoryGamePage() {
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState("solo");
  const [streakData, setStreakData] = useState([
    { day: "M", completed: true },
    { day: "T", completed: true },
    { day: "W", completed: false },
    { day: "T", completed: false },
    { day: "F", completed: false },
    { day: "S", completed: false },
    { day: "S", completed: false },
  ]);

  const handleStartGame = () => {
    alert(`Starting game in ${gameMode.toUpperCase()} mode!`);
    // Add game logic here
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#a64ac9] to-[#7b2cbf] text-white p-4 md:p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
      >
        ←
      </button>

      {/* Hero Section - Reduced spacing */}
      <div className="max-w-5xl mx-auto pt-1">
        {/* Pattern Grid Background - Smaller */}
        <div className="grid grid-cols-6 md:grid-cols-8 gap-2 md:gap-3 justify-center mb-8 opacity-25 pointer-events-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 md:w-10 md:h-10 rounded-lg border border-white/30"
            />
          ))}
        </div>

        {/* Game Header - Compact */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center text-3xl md:text-4xl text-[#7b2cbf] font-bold">
            🧠
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Memory Fiesta</h1>
          
          <div className="flex gap-2 justify-center mb-3">
            <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-medium">
              MEMORY
            </span>
            <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-medium">
              PATTERN
            </span>
            <span className="px-3 py-1 bg-white/15 rounded-full text-xs font-medium">
              SPEED
            </span>
          </div>
          
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
            Test your memory by recreating patterns!
          </p>
        </div>

        {/* Game Mode Selection - Compact */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex bg-white/10 rounded-xl p-1 mb-4">
            <button
              className={`flex-1 py-2 rounded-lg font-medium transition-all text-sm ${
                gameMode === "solo"
                  ? "bg-white text-[#7b2cbf]"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setGameMode("solo")}
            >
              🎮 Solo
            </button>
            <button
              className={`flex-1 py-2 rounded-lg font-medium transition-all text-sm ${
                gameMode === "duo"
                  ? "bg-white text-[#7b2cbf]"
                  : "text-white/70 hover:text-white"
              }`}
              onClick={() => setGameMode("duo")}
            >
              ⚔️ Duo
            </button>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            className="w-full py-3 bg-white text-[#7b2cbf] font-bold rounded-xl hover:scale-105 transition-transform shadow-xl text-base"
          >
            Start {gameMode === "solo" ? "Practice" : "Duel"}
          </button>
        </div>

        {/* Content Section - Compact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left Column - Game Info */}
          <div className="space-y-4">
            <div className="bg-[#0f0f14]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3">About the game</h3>
              <p className="text-white/80 mb-4 text-sm">
                Exercise your working memory and visual pattern recognition by
                observing and recreating increasingly complex patterns.
              </p>
              
              <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-xl p-4">
                <h4 className="font-bold text-sm mb-2">Example:</h4>
                <p className="text-white/70 text-sm">
                  Remembering where you parked your car in a large parking lot
                  or recalling the sequence of steps in a new recipe.
                </p>
              </div>
            </div>

            {/* Game Mode Description */}
            <div className="bg-[#0f0f14]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3">
                {gameMode === "solo" ? "Solo Mode" : "Duo Mode"}
              </h3>
              {gameMode === "solo" ? (
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</div>
                    Practice at your own pace
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</div>
                    Progress through 15 difficulty levels
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</div>
                    Compete for high scores
                  </li>
                </ul>
              ) : (
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">⚡</div>
                    Real-time multiplayer duel
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">⚡</div>
                    Race against the clock (10s per round)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs">⚡</div>
                    Win XP and climb leaderboards
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-4">
            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0f0f14]/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">1</div>
                  <div className="text-white/60 text-sm">Total plays</div>
                </div>
              </div>
              
              <div className="bg-[#0f0f14]/50 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">0</div>
                  <div className="text-white/60 text-sm">Highest score</div>
                </div>
              </div>
            </div>

            {/* Streak Section - Compact */}
            <div className="bg-[#0f0f14]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">🔥 1 day streak</h3>
                <div className="text-[#ffcc00] font-bold text-sm">+50 XP</div>
              </div>

              {/* Week Calendar - Compact */}
              <div className="flex justify-between mb-4">
                {streakData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 text-sm ${
                      day.completed 
                        ? 'bg-gradient-to-br from-[#ffcc00] to-[#ff9900] text-black' 
                        : 'bg-white/10'
                    }`}>
                      {day.completed ? '✓' : day.day}
                    </div>
                    <div className="text-xs text-white/60">{day.day}</div>
                  </div>
                ))}
              </div>

              {/* Streak Stats - Compact */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/60 text-xs mb-1">Best streak</div>
                  <div className="text-xl font-bold">1 day</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-white/60 text-xs mb-1">Last streak</div>
                  <div className="text-xl font-bold">0 days</div>
                </div>
              </div>
            </div>

            {/* Game Tips - Compact */}
            <div className="bg-gradient-to-r from-[#7b2cbf]/20 to-[#a64ac9]/20 rounded-2xl p-4 border border-white/10">
              <h4 className="font-bold text-sm mb-2">💡 Pro Tip</h4>
              <p className="text-white/70 text-xs">
                {gameMode === "solo"
                  ? "Start with simple patterns and gradually increase complexity. Try to visualize the pattern before recreating it."
                  : "In duo mode, speed is key! Practice solo first to memorize common patterns."}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section - Leaderboard Preview - Compact */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="bg-[#0f0f14]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">🏆 Leaderboard</h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: "You", score: 850, isYou: true },
                { rank: 2, name: "Alex", score: 1200 },
                { rank: 3, name: "Sam", score: 1150 },
              ].map((player) => (
                <div
                  key={player.rank}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    player.isYou
                      ? "bg-gradient-to-r from-[#7b2cbf]/30 to-[#a64ac9]/30"
                      : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm">
                      {player.rank}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-white/60">
                        {gameMode === "solo" ? "Solo High Score" : "Duo Wins"}
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-bold">{player.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}