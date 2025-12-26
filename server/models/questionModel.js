import mongoose from "mongoose";

const questionSchema = new mongoose.Schema( {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    question: { type: String, required: true },

    options: {
      type: [String],
      validate: (arr) => arr.length === 4,
    },

    correctAnswer: { type: Number, required: true },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
  },
  { timestamps: true }
)

const questionModel = mongoose.models.question || mongoose.model("question",questionSchema)
export default questionModel