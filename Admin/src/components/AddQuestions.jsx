import React, { useState } from "react";

export default function AddQuestions() {
  const [categories, setCategories] = useState([]);

  /* ================= CATEGORY ================= */

  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        description: "",
        timePerQuestion: 30,
        questions: [],
        isSaved: false,
      },
    ]);
  };

  const updateCategory = (id, field, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const saveCategory = (id) => {
    const category = categories.find((c) => c.id === id);

    if (!category.name.trim()) {
      alert("Category name is required");
      return;
    }

    // API CALL WILL GO HERE LATER
    console.log("CATEGORY SAVED:", category);

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, isSaved: true } : cat
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  /* ================= QUESTIONS ================= */

  const addQuestion = (categoryId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              questions: [
                ...cat.questions,
                {
                  id: Date.now(),
                  question: "",
                  difficulty: "Easy",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                },
              ],
            }
          : cat
      )
    );
  };

  const updateQuestion = (catId, qId, field, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === qId ? { ...q, [field]: value } : q
              ),
            }
          : cat
      )
    );
  };

  const updateOption = (catId, qId, index, value) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
              ...cat,
              questions: cat.questions.map((q) =>
                q.id === qId
                  ? {
                      ...q,
                      options: q.options.map((o, i) =>
                        i === index ? value : o
                      ),
                    }
                  : q
              ),
            }
          : cat
      )
    );
  };

  const saveQuestion = (catId, qId) => {
    const category = categories.find((c) => c.id === catId);
    const question = category.questions.find((q) => q.id === qId);

    if (!question.question.trim()) {
      alert("Question text required");
      return;
    }

    if (question.correctAnswer === "") {
      alert("Select correct answer");
      return;
    }

    // API CALL WILL GO HERE
    console.log("QUESTION SAVED:", {
      categoryId: catId,
      timePerQuestion: category.timePerQuestion,
      ...question,
    });

    alert("Question saved ✔");
  };

  /* ================= UI ================= */

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 text-white">
      <h1 className="text-3xl font-bold">Add Quiz Questions</h1>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="bg-[#0b1224] border border-white/10 rounded-2xl p-6 space-y-4"
        >
          {/* CATEGORY INPUTS */}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              placeholder="Category Name"
              value={cat.name}
              disabled={cat.isSaved}
              onChange={(e) =>
                updateCategory(cat.id, "name", e.target.value)
              }
              className="bg-white/5 px-4 py-2 rounded-lg"
            />

            <input
              type="number"
              min={5}
              disabled={cat.isSaved}
              placeholder="Time per question (sec)"
              value={cat.timePerQuestion}
              onChange={(e) =>
                updateCategory(
                  cat.id,
                  "timePerQuestion",
                  Number(e.target.value)
                )
              }
              className="bg-white/5 px-4 py-2 rounded-lg"
            />

            <button
              onClick={() => deleteCategory(cat.id)}
              className="text-red-400 text-sm"
            >
              Delete Category
            </button>
          </div>

          <textarea
            disabled={cat.isSaved}
            placeholder="Category description"
            value={cat.description}
            onChange={(e) =>
              updateCategory(cat.id, "description", e.target.value)
            }
            className="w-full bg-white/5 px-4 py-2 rounded-lg"
          />

          {/* SAVE CATEGORY */}
          {!cat.isSaved && (
            <button
              onClick={() => saveCategory(cat.id)}
              className="w-full bg-green-500 text-black py-2 rounded-lg font-semibold"
            >
              Save Category
            </button>
          )}

          {/* QUESTIONS */}
          {cat.isSaved && (
            <>
              {cat.questions.map((q, i) => (
                <div
                  key={q.id}
                  className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3"
                >
                  <h3 className="font-semibold">Question {i + 1}</h3>

                  <input
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      updateQuestion(
                        cat.id,
                        q.id,
                        "question",
                        e.target.value
                      )
                    }
                    className="w-full bg-white/5 px-3 py-2 rounded"
                  />

                  <div className="grid md:grid-cols-2 gap-2">
                    {q.options.map((opt, idx) => (
                      <input
                        key={idx}
                        placeholder={`Option ${idx + 1}`}
                        value={opt}
                        onChange={(e) =>
                          updateOption(
                            cat.id,
                            q.id,
                            idx,
                            e.target.value
                          )
                        }
                        className="bg-white/5 px-3 py-2 rounded"
                      />
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <select
                      value={q.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(
                          cat.id,
                          q.id,
                          "correctAnswer",
                          Number(e.target.value)
                        )
                      }
                      className="bg-white/5 px-4 py-2 rounded"
                    >
                      <option value="">Correct Answer</option>
                      {q.options.map((_, idx) => (
                        <option
                          key={idx}
                          value={idx}
                          className="bg-[#0b1224]"
                        >
                          Option {idx + 1}
                        </option>
                      ))}
                    </select>

                    <select
                      value={q.difficulty}
                      onChange={(e) =>
                        updateQuestion(
                          cat.id,
                          q.id,
                          "difficulty",
                          e.target.value
                        )
                      }
                      className="bg-white/5 px-4 py-2 rounded"
                    >
                      <option className="bg-[#0b1224]">Easy</option>
                      <option className="bg-[#0b1224]">Medium</option>
                      <option className="bg-[#0b1224]">Hard</option>
                    </select>
                  </div>

                  {/* SAVE QUESTION BUTTON */}
                  <button
                    onClick={() => saveQuestion(cat.id, q.id)}
                    className="w-full bg-[#1f5cff] text-black py-2 rounded-lg font-semibold"
                  >
                    Save Question
                  </button>
                </div>
              ))}

              {/* ADD QUESTION */}
              <button
                onClick={() => addQuestion(cat.id)}
                className="px-6 py-2 bg-[#1f5cff] text-black rounded-lg font-semibold"
              >
                + Add Question
              </button>
            </>
          )}
        </div>
      ))}

      {/* ADD CATEGORY */}
      <button
        onClick={addCategory}
        className="px-6 py-3 bg-white/10 rounded-xl"
      >
        + Add Category
      </button>
    </div>
  );
}
