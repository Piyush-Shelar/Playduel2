import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArcadeGames() {
  const navigate = useNavigate();
  
  const games = [
    { 
      id: "memory", 
      name: "Memory Fiesta", 
      desc: "Recreate patterns under time pressure.", 
      long: "Improve working memory and visual recall by observing patterns and recreating them accurately as difficulty increases.", 
      skill: "Memory", 
      tags: ["Pattern","Speed"], 
      icon: "🧠",
      color: "from-[#7c4dff] to-[#3b5bdb]",
      xp: "+50 XP"
    },
    { 
      id: "reflex", 
      name: "Reflex Fiesta", 
      desc: "Quick-fire reflex challenges.", 
      long: "Test your reaction time and precision by clicking targets as they appear.", 
      skill: "Reflex", 
      tags: ["Reaction","Speed"],
      icon: "⚡",
      color: "from-[#ff6a00] to-[#ee0979]",
      xp: "+70 XP"
    },
    { 
      id: "train", 
      name: "Train Fiesta", 
      desc: "Attention & reaction control game.", 
      long: "Guide trains by switching tracks at the correct time, sharpening focus and response accuracy.", 
      skill: "Attention", 
      tags: ["Reflex","Focus"], 
      icon: "🚆",
      color: "from-[#00ff85] to-[#00d4ff]",
      xp: "+60 XP"
    },
    { 
      id: "word", 
      name: "Word Fiesta", 
      desc: "Vocabulary ordering challenges.", 
      long: "Arrange words by meaning or intensity to enhance vocabulary depth and language intuition.", 
      skill: "Vocabulary", 
      tags: ["Words","AI"], 
      icon: "📚",
      color: "from-[#ff00c8] to-[#ffea00]",
      xp: "+80 XP"
    }
  ];

  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePlayGame = (game) => {
    if (!game) return;
    
    if (game.id === "memory") {
      // Navigate to memory page
      navigate("/memory");
    } 
    else if (game.id === "reflex") {
      navigate("/reflex");
    } else {
      alert(`Starting ${game.name}! (Page under development)`);
    }

  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-white px-4 md:px-0 bg-gradient-to-b from-[#040506] to-[#05060a] py-12">
      {/* Header */}
      <div className="w-full max-w-5xl text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-wide mb-2 bg-gradient-to-r from-[#3b5bdb] to-[#7c4dff] bg-clip-text text-transparent">
          Skill Arcade
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Challenge your brain with exciting cognitive games
        </p>
      </div>



      {/* Search Bar */}
      <div className="w-full max-w-2xl mb-10">
        <input
          className="w-full p-4 rounded-2xl bg-[#12182a] border border-[#232a55] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#3b5bdb]"
          placeholder="Search games by name, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Games Grid */}
      {!selectedGame && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
          {filteredGames.map((game, idx) => (
            <div
              key={game.id}
              className="relative p-6 rounded-3xl cursor-pointer border border-white/20 shadow-xl overflow-hidden group hover:scale-105 transition-all duration-300"
              onClick={() => setSelectedGame(game)}
            >
              {/* Gradient Background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}
              />
              
              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{game.icon}</div>
                  <span className="px-3 py-1 bg-black/30 rounded-full text-sm font-semibold">
                    {game.xp}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{game.name}</h2>
                <p className="text-white/70 mb-4">{game.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Game Details Modal - Reduced Height */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#161d34] to-[#12182a] rounded-3xl border border-white/20 shadow-2xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSelectedGame(null)}
            >
              ✕
            </button>

            {/* Hero Section - Reduced Height */}
            <div className="relative h-40 overflow-hidden">
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${selectedGame.color} opacity-90`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-7xl">{selectedGame.icon}</div>
              </div>
            </div>

            {/* Content - Adjusted Spacing */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedGame.name}</h2>
                <span className="px-3 py-1.5 bg-gradient-to-r from-[#3b5bdb] to-[#7c4dff] rounded-full text-sm font-semibold">
                  {selectedGame.xp}
                </span>
              </div>

              <p className="text-white/80 mb-4 text-base">
                {selectedGame.long}
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Skill Focus</h3>
                <div className="px-3 py-2 bg-white/5 rounded-xl inline-block">
                  <span className="text-[#5c7cfa] font-bold">{selectedGame.skill}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGame.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Game Stats - Smaller */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#7c4dff]">15</div>
                  <div className="text-white/60 text-xs">Levels</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#5c7cfa]">⏱️</div>
                  <div className="text-white/60 text-xs">Timed</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#00d4ff]">🎯</div>
                  <div className="text-white/60 text-xs">Accuracy</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  className="flex-1 py-3 bg-gradient-to-r from-[#3b5bdb] to-[#7c4dff] rounded-xl font-bold text-base hover:opacity-90 transition-opacity"
                  onClick={() => handlePlayGame(selectedGame)}
                >
                  Play Now
                </button>
                <button
                  className="px-5 py-3 border border-white/20 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
                  onClick={() => setSelectedGame(null)}
                >
                  Back to Games
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-2xl font-bold mb-2">No games found</h3>
          <p className="text-white/60">Try a different search term</p>
        </div>
      )}
    </div>
  );
}