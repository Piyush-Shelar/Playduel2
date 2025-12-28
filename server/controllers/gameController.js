import User from "../models/userModel.js";

/* ======================================================
   GAME CONFIG (TUNE HERE)
====================================================== */
const XP_RULES = {
  WIN: 200,
  LOSS: 50,
  STREAK_BONUS: 25, // per streak
};

const LEVEL_XP = 1000; // XP per level

const RANKS = [
  { name: "Bronze", minLevel: 1 },
  { name: "Silver", minLevel: 5 },
  { name: "Gold", minLevel: 10 },
  { name: "Platinum", minLevel: 20 },
  { name: "Diamond", minLevel: 30 },
];

/* ======================================================
   HELPER FUNCTIONS
====================================================== */

// 🔢 Calculate level from XP
const calculateLevel = (totalXP) => {
  return Math.max(1, Math.floor(totalXP / LEVEL_XP) + 1);
};

// 🏆 Assign rank based on level
const calculateRank = (level) => {
  let rank = "Bronze";
  for (const r of RANKS) {
    if (level >= r.minLevel) rank = r.name;
  }
  return rank;
};

// 🎖️ Badge unlock logic (extend later)
const unlockBadges = (user) => {
  const newBadges = [];

  if (user.stats.totalWins >= 10) {
    newBadges.push({ id: 1, icon: "Trophy", label: "Battle Master" });
  }

  if (user.stats.currentStreak >= 5) {
    newBadges.push({ id: 2, icon: "Zap", label: "Hot Streak" });
  }

  return newBadges;
};

/* ======================================================
   MAIN CONTROLLER
====================================================== */
export const processGameResult = async (req, res) => {
  try {
    const { gameType, result } = req.body;
    const userId = req.user.id;

    // result = "win" | "loss"
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    /* ---------------- STREAK LOGIC ---------------- */
    if (result === "win") {
      user.stats.currentStreak += 1;
      user.stats.totalWins += 1;
    } else {
      user.stats.currentStreak = 0;
    }

    user.stats.longestStreak = Math.max(
      user.stats.longestStreak,
      user.stats.currentStreak
    );

    /* ---------------- XP LOGIC ---------------- */
    let earnedXP =
      result === "win" ? XP_RULES.WIN : XP_RULES.LOSS;

    earnedXP += user.stats.currentStreak * XP_RULES.STREAK_BONUS;

    user.stats.totalXP += earnedXP;

    /* ---------------- LEVEL & RANK ---------------- */
    user.stats.level = calculateLevel(user.stats.totalXP);
    user.profile.rank = calculateRank(user.stats.level);

    /* ---------------- BADGES ---------------- */
    const unlocked = unlockBadges(user);

    unlocked.forEach((badge) => {
      const exists = user.badges.some((b) => b.id === badge.id);
      if (!exists) user.badges.push(badge);
    });

    await user.save();

    res.json({
      message: "Game result processed",
      earnedXP,
      stats: user.stats,
      rank: user.profile.rank,
      badges: user.badges,
    });
  } catch (error) {
    console.error("Game processing error:", error);
    res.status(500).json({ message: "Game processing failed" });
  }
};
