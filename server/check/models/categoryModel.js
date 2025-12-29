import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: "" },
    timePerQuestion: { type: Number, default: 30 },
  },
  { timestamps: true }
)

const categoryModel = mongoose.models.category || mongoose.model("category",categorySchema)

export default categoryModel