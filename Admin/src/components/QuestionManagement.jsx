import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaCheckCircle,
  FaTag,
  FaSearch,
} from "react-icons/fa";

/* ================= MOCK DATA ================= */

const initialQuestions = [
  {
    _id: "q1",
    category: "64fb1a9e12a1a1a1a1a1a1a1",
    categoryName: "JavaScript",
    question: "Which keyword is used to declare a variable?",
    options: ["var", "loop", "const", "int"],
    correctAnswer: 0,
    createdAt: "2024-01-01",
  },
  {
    _id: "q2",
    category: "64fb1a9e12b2b2b2b2b2b2b2",
    categoryName: "React",
    question: "Which hook is used for side effects?",
    options: ["useState", "useEffect", "useMemo", "useRef"],
    correctAnswer: 1,
    createdAt: "2024-01-02",
  },
  {
    _id: "q3",
    category: "64fb1a9e12c3c3c3c3c3c3c3",
    categoryName: "MongoDB",
    question: "Which operator is used for aggregation?",
    options: ["$sum", "$group", "$match", "All of these"],
    correctAnswer: 3,
    createdAt: "2024-01-03",
  },
];

/* ================= COMPONENT ================= */

export default function QuestionManagement() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [search, setSearch] = useState("");

  const filtered = questions.filter((q) => {
    const t = search.toLowerCase();
    return (
      q.question.toLowerCase().includes(t) ||
      q.categoryName.toLowerCase().includes(t) ||
      q.options.some((o) => o.toLowerCase().includes(t))
    );
  });

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q._id !== id));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
      {/* HEADER */}
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Question Management
        </h1>
        <p className="text-white/50 text-sm">
          Manage, search and delete questions across categories
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-12 max-w-xl relative">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions, categories or options…"
          className="w-full pl-12 pr-4 py-4 rounded-2xl
                     bg-[#0b1224]/80 backdrop-blur-md
                     border border-white/10
                     text-white outline-none
                     focus:border-indigo-500/40
                     shadow-lg transition"
        />
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filtered.map((q) => (
            <motion.div
              key={q._id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl p-6
                         bg-gradient-to-br from-[#0d1528]/90 to-[#1f1f2e]/90
                         border border-white/10
                         shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]
                         backdrop-blur-xl"
            >
              {/* TOP BAR */}
              <div className="flex items-center justify-between mb-4">
                <span className="flex items-center gap-2 px-3 py-1 text-xs
                                 bg-blue-500/20 text-blue-400 rounded-full">
                  <FaTag /> {q.categoryName}
                </span>

                <button
                  onClick={() => deleteQuestion(q._id)}
                  className="p-2 rounded-xl
                             bg-red-500/10 hover:bg-red-500/20
                             text-red-400 transition"
                >
                  <FaTrash />
                </button>
              </div>

              {/* QUESTION */}
              <h2 className="text-lg font-semibold leading-snug mb-6">
                {q.question}
              </h2>

              {/* OPTIONS */}
              <div className="space-y-2 mb-6">
                {q.options.map((opt, i) => {
                  const isCorrect = q.correctAnswer === i;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                        ${
                          isCorrect
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-[#0b1224]/80 border border-white/10 text-white/80"
                        }`}
                    >
                      {isCorrect && (
                        <FaCheckCircle className="text-green-400 shrink-0" />
                      )}
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* FOOTER META */}
              <div className="flex justify-between items-center text-xs text-white/40">
                <span>ID: {q._id}</span>
                <span>{q.createdAt}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/40 mt-24"
        >
          No matching questions found
        </motion.p>
      )}
    </div>
  );
}
