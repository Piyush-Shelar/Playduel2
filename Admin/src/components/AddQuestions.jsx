import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const API = "http://localhost:4000";

const difficulties = ["Easy", "Medium", "Hard"];

export default function AddCategory() {
  const [catName, setCatName] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [difficulty, setDifficulty] = useState("Easy");

  /* ================= ADD CATEGORY ================= */
  const addCategory = async (e) => {
    e.preventDefault();

    if (!catName.trim()) {
      return toast.error("Category name is required");
    }

    try {
      await axios.post(`${API}/api/manage/category`, {
        name: catName,
        description: catDesc,
        timePerQuestion,
        difficulty,
      });

      toast.success("Category created successfully");

      setCatName("");
      setCatDesc("");
      setTimePerQuestion(30);
      setDifficulty("Easy");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl bg-[#020617] border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl"
      >
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            Create Category
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Configure quiz rules before adding questions
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={addCategory} className="space-y-6">
          {/* CATEGORY NAME */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="Category name"
            className="input"
          />

          {/* DESCRIPTION */}
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            value={catDesc}
            onChange={(e) => setCatDesc(e.target.value)}
            placeholder="Short description"
            className="input h-24 resize-none"
          />

          {/* TIME */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="number"
            value={timePerQuestion}
            onChange={(e) => setTimePerQuestion(e.target.value)}
            placeholder="Time per question (seconds)"
            className="input"
          />

          {/* DIFFICULTY SELECTOR */}
          <div>
            <p className="text-sm text-white/60 mb-2">Difficulty</p>

            <div className="flex gap-3">
              {difficulties.map((level) => (
                <motion.button
                  type="button"
                  key={level}
                  onClick={() => setDifficulty(level)}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    backgroundColor:
                      difficulty === level
                        ? level === "Easy"
                          ? "rgba(34,197,94,0.2)"
                          : level === "Medium"
                          ? "rgba(234,179,8,0.2)"
                          : "rgba(239,68,68,0.2)"
                        : "rgba(255,255,255,0.05)",
                  }}
                  className={`flex-1 py-2 rounded-xl font-semibold transition-all ${
                    difficulty === level
                      ? level === "Easy"
                        ? "text-green-400"
                        : level === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                      : "text-white/60 hover:bg-white/10"
                  }`}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary w-full mt-4"
          >
            Create Category
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
