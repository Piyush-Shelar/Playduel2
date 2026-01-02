import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaBolt, FaListUl } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function CategoryManagement({API}) {
  

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [draftQuestions, setDraftQuestions] = useState([]);


  /* ================= FETCH CATEGORIES ================= */

  const getCategories = async () => {
    try {
      const res = await axios.get(`${API}/api/manage/category`);
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategories();
    
  }, []);

  /* ================= HELPERS ================= */

  const difficultyColor = (level) => {
    if (level === "Easy") return "bg-green-500/20 text-green-400";
    if (level === "Medium") return "bg-yellow-500/20 text-yellow-400";
    if (level === "Hard") return "bg-red-500/20 text-red-400";
    return "bg-white/20 text-white";
  };

  /* ================= ACTIONS ================= */

  const deleteCategory = async(catId) => {
 
    try {

      const res = await axios.delete(`${API}/api/manage/del-category/${catId}`)
      if (res.data.success) {
        toast.success(res.data.message)
      }
         setCategories((prev) => prev.filter((c) => c._id !== catId));

    } catch (error) {
      toast.error(error.messge)
    }

    if (activeCategory?._id === catId) {
      setActiveCategory(null);
      setDraftQuestions([]);
    }
  };

  const saveQuestions = () => {
    setCategories((prev) =>
      prev.map((c) =>
        c._id === activeCategory._id
          ? { ...c, questions: [...(c.questions || []), ...draftQuestions] }
          : c
      )
    );

    setDraftQuestions([]);
    setActiveCategory(null);
  };

  /* ================= UI ================= */

  return (
    <>
      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <motion.div
            key={cat._id}
            whileHover={{ scale: 1.03 }}
            className="relative bg-gradient-to-tl from-[#1f1f2e]/70 to-[#0d1528]/80
                       backdrop-blur-lg border border-white/10 rounded-3xl
                       p-6 shadow-xl flex flex-col justify-between"
          >
            {/* INFO */}
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {cat.name}
              </h2>

              <p className="text-white/70 text-sm mb-4">
                {cat.description}
              </p>

              {/* STATS – ONE ROW */}
         {/* STATS – ONE ROW (NO OVERFLOW) */}
<div className="flex flex-wrap items-center gap-3">
  <div
    className="flex items-center gap-2 px-3 py-1
               bg-blue-500/20 rounded-full
               text-blue-400 text-sm shrink-0"
  >
    <FaClock /> {cat.timePerQuestion} sec
  </div>

  <div
    className={`flex items-center gap-2 px-3 py-1
                rounded-full text-sm shrink-0
                ${difficultyColor(cat.difficulty || "Easy")}`}
  >
    <FaBolt /> {cat.difficulty || "Easy"}
  </div>

  <div
    className="flex items-center gap-2 px-3 py-1
               bg-purple-500/20 rounded-full
               text-purple-400 text-sm shrink-0"
  >
    <FaListUl /> {cat.questionCount || 0} Qs
  </div>
</div>

            </div>

            {/* ACTIONS */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setActiveCategory(cat);
                  setDraftQuestions([]);
                  
                }}
                className="flex-1 px-4 py-2 bg-indigo-500/20
                           hover:bg-indigo-500/30 transition
                           rounded-xl text-indigo-300 font-semibold" 
              >
                Add Questions
              </button>

              <button
                onClick={() => deleteCategory(cat._id)}
                className="px-4 py-2 bg-red-500/20
                           hover:bg-red-500/30 transition
                           rounded-xl text-red-400 font-semibold"
              >
                Delete
              </button>
            </div>

            {/* BADGE */}
        
          </motion.div>
        ))}
      </div>

      {/* SLIDE-OVER QUESTION PANEL */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px]
                       bg-[#0b1224] border-l border-white/10
                       z-50 p-6 overflow-y-auto"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">
                {activeCategory.name}
              </h2>

              <button
                onClick={() => setActiveCategory(null)}
                className="text-white/50 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* QUESTION FORM */}
            <QuestionForm categoryId={activeCategory._id}
              onAdd={(q) =>
                setDraftQuestions((prev) => [...prev, q])
              } 
            />

            {draftQuestions.length > 0 && (
              <div className="mt-6 space-y-3">
                <p className="text-sm text-white/60">
                  Questions added: {draftQuestions.length}
                </p>

                <button
                  onClick={saveQuestions}
                  className="w-full bg-green-500/20
                             hover:bg-green-500/30 transition
                             text-green-300 py-2 rounded-xl font-semibold"
                >
                  Save Questions
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================= QUESTION FORM ================= */

function QuestionForm({ onAdd,categoryId }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
const API = "http://localhost:4000"
  const addQuestion = async() => {
    if (!question || options.some((o) => !o)) return;
else{
  try {
    const res = await axios.post(`${API}/api/manage/question`,{
      categoryId:categoryId,
      question:question,
      options:options,
      correctAnswer:correct
    })
 if (res.data.success) {
  toast.success(res.data.message)
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrect(0);
 }



  } catch (error) {
      console.error(error.message);
  }
}
    onAdd({
      question,
      options,
      correctAnswer: correct,
      timeLimit: 30,
    });


  };

  return (
    <div className="space-y-4">
      <input
        value={question}required
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Question"
        className="w-full rounded-lg bg-[#111827] border border-white/10
                   px-4 py-2 text-white"
      />

      {options.map((opt, i) => (
        <input
          key={i}required
          value={opt}
          onChange={(e) => {
            const copy = [...options];
            copy[i] = e.target.value;
            setOptions(copy);
          }}
          placeholder={`Option ${i + 1}`}
          className="w-full rounded-lg bg-[#111827] border border-white/10
                     px-4 py-2 text-white"
        />
      ))}

      {/* CORRECT ANSWER */}
      <div>
        <p className="text-sm text-white/60 mb-2">Correct Answer</p>
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <label
              key={i}
              className={`cursor-pointer rounded-lg border px-3 py-2 text-center
                ${
                  correct === i
                    ? "border-indigo-500 bg-indigo-500/20"
                    : "border-white/10"
                }`}
            >
              <input
                type="radio"
                className="hidden"
                checked={correct === i}
                onChange={() => setCorrect(i)}
              />
              {i + 1}
            </label>
          ))}
        </div>
      </div>


      <button
        onClick={addQuestion}
        className="w-full bg-indigo-500/20
                   hover:bg-indigo-500/30 transition
                   text-indigo-300 py-2 rounded-xl font-semibold"
      >
        Add Question
      </button>
    </div>
  );
}
