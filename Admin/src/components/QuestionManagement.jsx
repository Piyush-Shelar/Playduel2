import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaBolt } from "react-icons/fa";

export default function QuestionManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "AI & ML",
      description: "Basics of Artificial Intelligence & Machine Learning",
      questions: [
        { id: 101, difficulty: "Easy", timeLimit: 20 },
        { id: 102, difficulty: "Medium", timeLimit: 30 },
      ],
    },
    {
      id: 2,
      name: "Web Development",
      description: "Frontend & Backend fundamentals",
      questions: [
        { id: 201, difficulty: "Easy", timeLimit: 15 },
      ],
    },
  ]);

  const deleteCategory = (catId) => {
    setCategories(categories.filter((c) => c.id !== catId));
  };

  const editCategory = (catId) => {
    alert("Edit functionality for category " + catId);
  };

  const totalDuration = (questions) =>
    questions.reduce((sum, q) => sum + q.timeLimit, 0);

  const averageDifficulty = (questions) => {
    if (questions.length === 0) return "N/A";
    const levels = { Easy: 1, Medium: 2, Hard: 3 };
    const avg = Math.round(
      questions.reduce((sum, q) => sum + levels[q.difficulty], 0) / questions.length
    );
    return Object.keys(levels).find((key) => levels[key] === avg) || "Medium";
  };

  const difficultyColor = (level) => {
    if (level === "Easy") return "bg-green-500/20 text-green-400";
    if (level === "Medium") return "bg-yellow-500/20 text-yellow-400";
    if (level === "Hard") return "bg-red-500/20 text-red-400";
    return "bg-white/20 text-white";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((cat) => (
        <motion.div
          key={cat.id}
          whileHover={{ scale: 1.03 }}
          className="relative bg-gradient-to-tl from-[#1f1f2e]/70 to-[#0d1528]/80 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-transform duration-300"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{cat.name}</h2>
            <p className="text-white/70 mb-4">{cat.description}</p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-sm font-medium">
                <FaClock /> {totalDuration(cat.questions)} sec
              </div>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${difficultyColor(averageDifficulty(cat.questions))}`}>
                <FaBolt /> {averageDifficulty(cat.questions)}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => editCategory(cat.id)}
              className="flex-1 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => deleteCategory(cat.id)}
              className="flex-1 px-4 py-2 bg-red-500/20 rounded-xl hover:bg-red-500/30 transition text-red-400 font-semibold"
            >
              Delete
            </button>
          </div>

          {/* Optional floating badge */}
          <div className="absolute top-4 right-4 px-2 py-1 bg-gradient-to-r from-[#1f5cff] to-[#00bcd4] text-black font-bold text-xs rounded-full shadow-lg">
            Category
          </div>
        </motion.div>
      ))}

      {categories.length === 0 && (
        <div className="col-span-full text-center text-white/50 py-20 text-xl">
          No categories available
        </div>
      )}
    </div>
  );
}
