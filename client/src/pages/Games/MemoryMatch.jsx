import React, { useState, useEffect, useRef } from "react";
import { useNavigate ,  useLocation  } from "react-router-dom";


export default function MemoryFiestaGame() {
  const navigate = useNavigate();

  const location = useLocation(); // ADD THIS LINE
  const routeState = location.state || {}; // ADD THIS LINE
  const [mode, setMode] = useState(routeState.mode || null); // MODIFY THIS LINE

//   const [mode, setMode] = useState(null); // "solo", "duo"

  const [screen, setScreen] = useState("menu");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([
    { name: "Player A", emoji: "😀", ready: false },
    { name: "Player B", emoji: "😎", ready: false }
  ]);
  const [gamePhase, setGamePhase] = useState("countdown");
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState({ playerA: 0, playerB: 0 });
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === "countdown") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setScreen("gameplay");
      }
    }
  }, [screen, countdown]);

  useEffect(() => {
    if (screen === "gameplay" && mode === "solo") {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, mode]);

    useEffect(() => {
    if (routeState.mode && !mode) {
      // If we have a mode from route state and mode isn't set yet
      setMode(routeState.mode);
      if (routeState.mode === "solo") {
        startSolo();
      } else if (routeState.mode === "duo") {
        startDuo();
      }
    }
  }, [routeState.mode, mode]); // ADD THIS USEEFFECT

  function startSolo() {
    setMode("solo");
    setCountdown(3);
    setScreen("countdown");
    setTimer(0);
    setScore({ playerA: 0, playerB: 0 });
  }

  function startDuo() {
    setMode("duo");
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setScreen("duoLobby");
    setScore({ playerA: 0, playerB: 0 });
  }

  function readyToPlay(playerIndex) {
    const newPlayers = [...players];
    newPlayers[playerIndex].ready = !newPlayers[playerIndex].ready;
    setPlayers(newPlayers);
    
    // Start game when all players are ready
    if (newPlayers.every(p => p.ready) && newPlayers.length >= 2) {
      setCountdown(3);
      setScreen("countdown");
    }
  }

  function copyRoomCode() {
    navigator.clipboard.writeText(roomCode);
    alert("Room code copied!");
  }

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2a] text-white p-4 md:p-8">
      {/* Game Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        <button
          onClick={goBack}
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          ←
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#a64ac9] to-[#7b2cbf] bg-clip-text text-transparent">
            Memory Fiesta
          </h1>
          <div className="flex gap-2 justify-center">
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">MEMORY</span>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs">PATTERN</span>
          </div>
        </div>
        
        <div className="text-right">
          {screen === "gameplay" && mode === "solo" && (
            <>
              <div className="text-2xl font-bold text-[#ffcc00]">{timer}s</div>
              <div className="text-sm text-white/60">Time</div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4 md:px-8">
        {screen === "menu" && (
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4 justify-center mb-12 opacity-25 pointer-events-none">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl border border-white/30"
                />
              ))}
            </div>

            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 bg-gradient-to-br from-[#a64ac9] to-[#7b2cbf] rounded-3xl flex items-center justify-center text-5xl md:text-6xl font-bold shadow-2xl">
              🧠
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Memory Fiesta</h1>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
              Memorize patterns and challenge your working memory
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all hover:scale-105 cursor-pointer"
                   onClick={startSolo}>
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-bold mb-3">Solo Mode</h3>
                <p className="text-white/70 mb-4">Practice at your own pace, beat your high scores</p>
                <div className="flex gap-2 justify-center">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">15 Levels</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Unlimited</span>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all hover:scale-105 cursor-pointer"
                   onClick={startDuo}>
                <div className="text-6xl mb-4">⚔️</div>
                <h3 className="text-2xl font-bold mb-3">Duo Mode</h3>
                <p className="text-white/70 mb-4">Challenge friends, real-time competition</p>
                <div className="flex gap-2 justify-center">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">Real-time</span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-xs">2 Players</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {screen === "duoLobby" && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Duo Challenge Room</h2>
            
            <div className="bg-gradient-to-r from-[#7b2cbf]/30 to-[#a64ac9]/30 rounded-3xl p-8 mb-8">
              <div className="text-lg mb-2">Room Code</div>
              <div className="text-4xl font-bold mb-4 tracking-widest">{roomCode}</div>
              <button
                onClick={copyRoomCode}
                className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
              >
                Copy Code
              </button>
            </div>

            <p className="text-white/60 mb-8">
              Share this code with your friend to join the game
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {players.map((player, index) => (
                <div key={index} 
                     className={`p-6 rounded-3xl border transition-all ${
                       player.ready 
                         ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30' 
                         : 'bg-white/5 border-white/10'
                     }`}>
                  <div className="text-5xl mb-3">{player.emoji}</div>
                  <div className="text-xl font-bold mb-3">{player.name}</div>
                  <div className="text-white/60 mb-4">{player.ready ? 'Ready!' : 'Waiting...'}</div>
                  <button
                    onClick={() => readyToPlay(index)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      player.ready 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-[#a64ac9] to-[#7b2cbf]'
                    }`}
                  >
                    {player.ready ? '✓ Ready' : 'Ready Up'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-white/50">
              Waiting for both players to ready up...
            </div>
          </div>
        )}

        {screen === "countdown" && (
          <div className="max-w-4xl mx-auto text-center h-[60vh] flex flex-col items-center justify-center">
            <div className="text-8xl md:text-9xl font-bold mb-8">
              {countdown > 0 ? countdown : "GO!"}
            </div>
            <div className="text-2xl text-white/70">
              Get ready to memorize!
            </div>
            <div className="mt-8 flex gap-4">
              <span className="w-4 h-4 rounded-full bg-[#a64ac9] animate-pulse"></span>
              <span className="w-4 h-4 rounded-full bg-[#7b2cbf] animate-pulse" style={{animationDelay: '0.2s'}}></span>
              <span className="w-4 h-4 rounded-full bg-[#ff3366] animate-pulse" style={{animationDelay: '0.4s'}}></span>
            </div>
          </div>
        )}

        {screen === "gameplay" && (
          <MemoryGameCore 
            mode={mode} 
            onEnd={() => setScreen("results")}
            score={score}
            setScore={setScore}
          />
        )}

        {screen === "results" && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Game Over!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-4">Your Score</h3>
                <div className="text-6xl font-bold text-[#ffcc00] mb-4">
                  {mode === "solo" ? score.playerA : Math.max(score.playerA, score.playerB)}
                </div>
                <div className="text-white/60">
                  {mode === "solo" ? "Solo High Score" : "Winner's Score"}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-4">Rewards</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>XP Earned</span>
                    <span className="text-xl font-bold text-green-400">+50 XP</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time Bonus</span>
                    <span className="text-xl font-bold text-blue-400">+20 XP</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg">Total</span>
                    <span className="text-2xl font-bold text-[#ffcc00]">+70 XP</span>
                  </div>
                </div>
              </div>
            </div>

            {mode === "duo" && (
              <div className="bg-gradient-to-r from-[#7b2cbf]/20 to-[#a64ac9]/20 rounded-3xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-6">Match Results</h3>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{player.emoji}</div>
                        <div>
                          <div className="font-bold">{player.name}</div>
                          <div className="text-sm text-white/60">
                            {index === 0 ? score.playerA : score.playerB} points
                          </div>
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${
                        (index === 0 && score.playerA > score.playerB) || 
                        (index === 1 && score.playerB > score.playerA)
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {(index === 0 && score.playerA > score.playerB) || 
                         (index === 1 && score.playerB > score.playerA)
                          ? 'Winner!' 
                          : 'Runner Up'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => mode === "solo" ? startSolo() : startDuo()}
                className="px-8 py-4 bg-gradient-to-r from-[#a64ac9] to-[#7b2cbf] rounded-2xl font-bold hover:scale-105 transition-transform"
              >
                Play Again
              </button>
              <button
                onClick={() => setScreen("menu")}
                className="px-8 py-4 border border-white/20 rounded-2xl font-bold hover:bg-white/10 transition-colors"
              >
                Main Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Core gameplay component with improved visuals
function MemoryGameCore({ mode, onEnd, score, setScore }) {
  const [gridSize, setGridSize] = useState(3);
  const [pattern, setPattern] = useState([]);
  const [displayPattern, setDisplayPattern] = useState(true);
  const [selected, setSelected] = useState([]);
  const [lives, setLives] = useState(3);
  const [roundsPerfect, setRoundsPerfect] = useState(0);
  const [round, setRound] = useState(1);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [duoTurn, setDuoTurn] = useState(0); // 0 = Player A, 1 = Player B
  const [duoRound, setDuoRound] = useState(1);
  const timerRef = useRef(null);

  const cellColors = [
    "bg-gradient-to-r from-[#ff3366] to-[#ff6699]", // Red
    "bg-gradient-to-r from-[#3366ff] to-[#6699ff]", // Blue
    "bg-gradient-to-r from-[#33ff66] to-[#66ff99]", // Green
    "bg-gradient-to-r from-[#ffff33] to-[#ffff66]", // Yellow
    "bg-gradient-to-r from-[#cc33ff] to-[#cc66ff]", // Purple
    "bg-gradient-to-r from-[#ff9933] to-[#ffcc66]", // Orange
  ];

  const startRound = () => {
    const positions = Array.from({ length: gridSize * gridSize }, (_, i) => i);
    const randomPattern = [];
    const patternLength = gridSize + 2; // Pattern gets longer with grid size
    
    while (randomPattern.length < patternLength) {
      const pick = positions[Math.floor(Math.random() * positions.length)];
      if (!randomPattern.includes(pick)) randomPattern.push(pick);
    }
    
    setPattern(randomPattern);
    setDisplayPattern(true);
    setSelected([]);
    
    // Show pattern for varying time based on difficulty
    const showTime = 3000 - (gridSize * 200); // Less time as grid gets bigger
    setTimeout(() => {
      setDisplayPattern(false);
      if (mode === "duo") {
        setTimeLeft(15); // Shorter time for duo mode
      }
    }, Math.max(1500, showTime));
  };

  useEffect(() => {
    if (mode === "solo") {
      setTimeLeft(30);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            onEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    startRound();
    
    return () => clearInterval(timerRef.current);
  }, [mode]); // ADD mode TO DEPENDENCY ARRAY

  useEffect(() => {
    if (mode === "duo" && !displayPattern && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // End turn if time runs out
            endTurn(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [mode, displayPattern, timeLeft]);

  const handleSelect = (idx) => {
    if (displayPattern || selected.includes(idx)) return;

    const newSel = [...selected, idx];
    setSelected(newSel);
    
    // Check if this was the correct next cell
    if (newSel.length <= pattern.length) {
      const correct = pattern[newSel.length - 1] === idx;
      
      if (!correct) {
        // Wrong selection
        if (mode === "solo") {
          setLives(prev => {
            if (prev <= 1) {
              onEnd();
              return 0;
            }
            return prev - 1;
          });
          setCombo(0);
        } else {
          endTurn(false);
        }
         setSelected([]); // ADD THIS LINE to clear selection on wrong choice
        return;
      }
      
      // Correct selection
      if (newSel.length === pattern.length) {
        // Completed the pattern
        const baseScore = 10;
        const comboBonus = combo * 5;
        const difficultyBonus = gridSize * 2;
        const perfectBonus = pattern.length === newSel.length ? 15 : 0;
        const roundScore = baseScore + comboBonus + difficultyBonus + perfectBonus;
        
        if (mode === "solo") {
          setScore({ ...score, playerA: score.playerA + roundScore });
          setCombo(prev => prev + 1);
          setRoundsPerfect(prev => prev + 1);
          
          if (roundsPerfect + 1 >= 4 && lives < 3) {
            setLives(prev => prev + 1);
            setRoundsPerfect(0);
          }
          
          if (gridSize < 5 && round % 2 === 0) {
            setGridSize(prev => prev + 1);
          }
        } else {
          // Duo mode
          if (duoTurn === 0) {
            setScore({ ...score, playerA: score.playerA + roundScore });
          } else {
            setScore({ ...score, playerB: score.playerB + roundScore });
          }
          endTurn(true);
        }
        
        setRound(prev => prev + 1);
        startRound();
      }
    }
  };

  const endTurn = (success) => {
    if (mode === "duo") {
      if (duoRound >= 5) {
        onEnd();
      } else {
        setDuoTurn(prev => (prev + 1) % 2);
        setDuoRound(prev => prev + 1);
        setSelected([]);
        setCombo(0);
        setTimeLeft(15);
        startRound();
      }
    }
  };

  const cells = Array.from({ length: gridSize * gridSize }, (_, i) => i);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <div className="text-sm text-white/60 mb-1">Round</div>
          <div className="text-2xl font-bold">{mode === "solo" ? round : duoRound}/5</div>
        </div>
        
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <div className="text-sm text-white/60 mb-1">Time</div>
          <div className={`text-2xl font-bold ${
            timeLeft < 10 ? 'text-red-400 animate-pulse' : 'text-white'
          }`}>
            {timeLeft}s
          </div>
        </div>
        
        {mode === "solo" ? (
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <div className="text-sm text-white/60 mb-1">Lives</div>
            <div className="text-2xl font-bold text-red-400">{lives} ❤️</div>
          </div>
        ) : (
          <div className="bg-white/5 rounded-2xl p-4 text-center">
            <div className="text-sm text-white/60 mb-1">Turn</div>
            <div className="text-2xl font-bold">{duoTurn === 0 ? 'Player A' : 'Player B'}</div>
          </div>
        )}
        
        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <div className="text-sm text-white/60 mb-1">Score</div>
          <div className="text-2xl font-bold text-[#ffcc00]">
            {mode === "solo" ? score.playerA : (duoTurn === 0 ? score.playerA : score.playerB)}
          </div>
        </div>
      </div>

      {/* Current Player (Duo Mode) */}
      {mode === "duo" && (
        <div className="bg-gradient-to-r from-[#7b2cbf]/20 to-[#a64ac9]/20 rounded-2xl p-4 mb-6 text-center">
          <div className="text-lg font-bold mb-1">
            {duoTurn === 0 ? 'Player A' : 'Player B'}'s Turn
          </div>
          <div className="text-white/60">Memorize and recreate the pattern</div>
        </div>
      )}

      {/* Pattern Display */}
      <div className="mb-8 text-center">
        <div className="text-xl font-bold mb-4">
          {displayPattern ? "Memorize this pattern!" : "Recreate the pattern!"}
        </div>
        
        {/* Grid */}
        <div className={`grid gap-3 mx-auto max-w-md ${
          gridSize === 3 ? 'grid-cols-3' :
          gridSize === 4 ? 'grid-cols-4' :
          gridSize === 5 ? 'grid-cols-5' : 'grid-cols-6'
        }`}>
          {cells.map((i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={displayPattern}
              className={`
                aspect-square rounded-xl flex items-center justify-center text-2xl font-bold
                transition-all duration-300 relative overflow-hidden
                ${displayPattern 
                  ? (pattern.includes(i) 
                    ? cellColors[i % cellColors.length] + ' scale-110' 
                    : 'bg-white/10 border border-white/20')
                  : (selected.includes(i)
                    ? (pattern.includes(i) 
                      ? cellColors[i % cellColors.length] + ' scale-110' 
                      : 'bg-red-500/50 scale-110')
                    : 'bg-white/10 hover:bg-white/20 hover:scale-105')
                }
                ${displayPattern ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              {displayPattern && pattern.includes(i) && (
                <div className="animate-ping absolute inset-0 bg-white/30 rounded-xl"></div>
              )}
              {!displayPattern && selected.includes(i) && (
                <div className="text-white text-xl">✓</div>
              )}
              {displayPattern && pattern.includes(i) && (
                <div className="text-white text-2xl">★</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <div className="text-white/60">Progress</div>
          <div className="text-white/60">
            {selected.length}/{pattern.length} cells
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#a64ac9] to-[#7b2cbf] transition-all duration-300"
            style={{ width: `${(selected.length / pattern.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Combo Display */}
      {combo > 0 && mode === "solo" && (
        <div className="text-center mb-6">
          <div className="text-xl font-bold text-[#ffcc00]">COMBO x{combo}!</div>
          <div className="text-white/60">+{combo * 5} bonus points</div>
        </div>
      )}

      {/* Game Controls */}
      <div className="flex gap-4 justify-center">
        {mode === "solo" && (
          <button
            onClick={onEnd}
            className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
          >
            End Game
          </button>
        )}
        <button
          onClick={startRound}
          className="px-6 py-3 bg-gradient-to-r from-[#a64ac9] to-[#7b2cbf] rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          Skip Round
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center text-white/60 text-sm">
        {displayPattern 
          ? "Memorize the highlighted cells..."
          : "Click the cells in the correct order..."}
      </div>
    </div>
  );
}