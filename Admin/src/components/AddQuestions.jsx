import React, { useState } from "react";

export default function AddQuestions() {
  const [categories, setCategories] = useState([
    { id: Date.now(), name: "AI & ML", questions: [] },
  ]);

  /* ================= CATEGORY FUNCTIONS ================= */
  const addCategory = () => {
    setCategories([
      ...categories,
      { id: Date.now() + Math.random(), name: "", questions: [] },
    ]);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const updateCategoryName = (id, value) => {
    setCategories(
      categories.map((c) => (c.id === id ? { ...c, name: value } : c))
    );
  };

  /* ================= QUESTION FUNCTIONS ================= */
  const addQuestion = (catId) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              questions: [
                ...c.questions,
                {
                  id: Date.now() + Math.random(),
                  question: "",
                  description: "",
                  type: "MCQ",
                  difficulty: "Easy",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                  timeLimit: 10,
                },
              ],
            }
          : c
      )
    );
  };

  const deleteQuestion = (catId, qId) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? { ...c, questions: c.questions.filter((q) => q.id !== qId) }
          : c
      )
    );
  };

  const updateQuestion = (catId, qId, field, value) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              questions: c.questions.map((q) =>
                q.id === qId ? { ...q, [field]: value } : q
              ),
            }
          : c
      )
    );
  };

  const updateOption = (catId, qId, index, value) => {
    setCategories(
      categories.map((c) =>
        c.id === catId
          ? {
              ...c,
              questions: c.questions.map((q) =>
                q.id === qId
                  ? {
                      ...q,
                      options: q.options.map((opt, i) =>
                        i === index ? value : opt
                      ),
                    }
                  : q
              ),
            }
          : c
      )
    );
  };

  const handleSave = (catId, qId) => {
    const question = categories
      .find((c) => c.id === catId)
      ?.questions.find((q) => q.id === qId);
    console.log("Saving question:", question);
    alert("Question saved! Check console for details.");
  };

  return (
    <div className="space-y-6">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="p-6 bg-[#0d1528] rounded-2xl border border-white/10"
        >
          {/* CATEGORY HEADER */}
          <div className="flex justify-between items-center mb-4">
            <input
              placeholder="Category Name"
              value={cat.name}
              onChange={(e) => updateCategoryName(cat.id, e.target.value)}
              className="bg-white/5 text-white placeholder-white/60 px-4 py-2 rounded-lg w-2/3"
            />
            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-red-400 hover:text-red-500"
            >
              Delete
            </button>
          </div>

          {/* QUESTIONS */}
          {cat.questions.map((q, i) => (
            <div
              key={q.id}
              className="bg-black/40 p-5 rounded-xl mb-4 space-y-3"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-white">Q{i + 1}</span>
                <button
                  onClick={() => deleteQuestion(cat.id, q.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>

              {/* QUESTION INPUT */}
              <input
                type="text"
                placeholder="Enter question"
                value={q.question}
                onChange={(e) =>
                  updateQuestion(cat.id, q.id, "question", e.target.value)
                }
                className="w-full px-3 py-2 rounded bg-white/5 text-white placeholder-white/60 border border-white/20"
              />

              {/* SHORT DESCRIPTION */}
              <textarea
                placeholder="Short Description"
                value={q.description}
                onChange={(e) =>
                  updateQuestion(cat.id, q.id, "description", e.target.value)
                }
                className="w-full px-3 py-2 rounded bg-white/5 text-white placeholder-white/60 border border-white/20"
              />

              {/* OPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, idx) => (
                  <input
                    key={idx}
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) =>
                      updateOption(cat.id, q.id, idx, e.target.value)
                    }
                    className="w-full px-3 py-2 rounded bg-white/5 text-white placeholder-white/60 border border-white/20"
                  />
                ))}
              </div>

              {/* CORRECT ANSWER */}
              <select
                value={q.correctAnswer}
                onChange={(e) =>
                  updateQuestion(cat.id, q.id, "correctAnswer", e.target.value)
                }
                className="bg-white/5 text-white px-4 py-2 rounded-lg w-full border border-white/20"
              >
                <option value="">Select Correct Answer</option>
                {q.options.map((_, idx) => (
                  <option
                    key={idx}
                    value={idx}
                    className="bg-[#0d1528] text-white"
                  >
                    {q.options[idx] || `Option ${idx + 1}`}
                  </option>
                ))}
              </select>

              {/* DIFFICULTY */}
              <select
                value={q.difficulty}
                onChange={(e) =>
                  updateQuestion(cat.id, q.id, "difficulty", e.target.value)
                }
                className="bg-white/5 text-white px-4 py-2 rounded-lg w-full border border-white/20"
              >
                <option  className="bg-[#0d1528] text-white" value="Easy">Easy</option>
                <option className="bg-[#0d1528] text-white" value="Medium">Medium</option>
                <option className="bg-[#0d1528] text-white" value="Hard">Hard</option>
              </select>

              {/* TIMER */}
              <input
                type="number"
                min={5}
                max={300}
                placeholder="Time Limit (seconds)"
                value={q.timeLimit}
                onChange={(e) =>
                  updateQuestion(cat.id, q.id, "timeLimit", e.target.value)
                }
                className="w-full px-3 py-2 rounded bg-white/5 text-white placeholder-white/60 border border-white/20"
              />

              {/* SAVE BUTTON */}
              <button
                onClick={() => handleSave(cat.id, q.id)}
                className="mt-2 w-full py-2 rounded-lg bg-[#1f5cff] text-black font-semibold hover:bg-[#0db8ff] transition"
              >
                Save Question
              </button>
            </div>
          ))}

          {/* ADD QUESTION BUTTON */}
          <button
            onClick={() => addQuestion(cat.id)}
            className="mt-2 px-5 py-2 rounded-lg bg-[#1f5cff] text-black font-semibold hover:bg-[#0db8ff] transition"
          >
            + Add Question
          </button>
        </div>
      ))}

      {/* ADD CATEGORY BUTTON */}
      <button
        onClick={addCategory}
        className="px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition"
      >
        + Add Category
      </button>
    </div>
  );
}
