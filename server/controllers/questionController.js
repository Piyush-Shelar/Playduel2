import categoryModel from "../models/categoryModel.js";
import questionModel from "../models/questionModel.js";



/* ================= ADD QUESTION ================= */
export const addQuestion = async (req, res) => {
  try {
    const {
      categoryId,
      question,
      options,
      correctAnswer,
    } = req.body;

    /* Validate category */
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    /* Validate options */
    if (!Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({
        success: false,
        message: "Options must contain exactly 4 values",
      });
    }

    const newQuestion = await questionModel.create({
      category: categoryId,
      question,
      options,
      correctAnswer,
     
    });
await categoryModel.findByIdAndUpdate(categoryId,{$inc:{questionCount:1}})
    res.status(201).json({
      success: true,
      message: "Question added",
      data: newQuestion,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add question",
    });
  }
};


export const countQuestionPerCategory = async (req,res) => {
  try {
    const count = await questionModel.fin
  } catch (error) {
    
  }
}

