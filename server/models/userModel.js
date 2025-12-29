import mongoose from "mongoose";

/* ============================
   Badge Sub-Schema
============================ */
const badgeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    icon: { type: String, required: true }, // Trophy, Star, Zap, etc.
    label: { type: String, required: true }
  },
  { _id: false }
);

/* ============================
   Profile Sub-Schema
============================ */
const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    rank: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
      default: "Bronze"
    },
    avatarIcon: {
      type: String,
      default: "User"
    }
  },
  { _id: false }
);

/* ============================
   Stats Sub-Schema
============================ */
const statsSchema = new mongoose.Schema(
  {
    totalXP: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    totalWins: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    quizzesPlayed: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 } // percentage
  },
  { _id: false }
);

/* ============================
   Arcade Game Sub-Schema
   (Activated on First Play)
============================ */
const arcadeGameSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      required: true
    },
    gameName: {
      type: String,
      required: true
    },

    isActivated: {
      type: Boolean,
      default: true
    },

    totalPlays: {
      type: Number,
      default: 1
    },
    bestScore: {
      type: Number,
      default: 0
    },

    totalXPearned: {
      type: Number,
      default: 0
    },

    currentStreak: {
      type: Number,
      default: 0
    },

    firstPlayedAt: {
      type: Date,
      default: Date.now
    },
    lastPlayedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

/* ============================
   Main User Schema
============================ */
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },

    badges: {
      type: [badgeSchema],
      default: []
    },

    profile: {
      type: profileSchema,
      required: true
    },

    stats: {
      type: statsSchema,
      default: () => ({})
    },

    // 🕹️ Arcade games activated on first play
    arcadeGames: {
      type: [arcadeGameSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
