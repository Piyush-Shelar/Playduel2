import express from "express";
import {addQuestion,deleteQuestion, getQuestions} from "../controllers/questionController.js";
import { addCategory, deleteCategory, getCategories} from "../controllers/categoryController.js";

const adminRouter = express.Router();

/* CATEGORY */
adminRouter.post("/category", addCategory);
adminRouter.get("/category", getCategories);
adminRouter.delete("/del-category/:id", deleteCategory);

/* QUESTION */
adminRouter.post("/question", addQuestion);
adminRouter.delete("/question/:id",deleteQuestion);
adminRouter.get('/get-all-quest',getQuestions)

export default adminRouter;
