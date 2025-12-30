import express from "express";
import {addQuestion} from "../controllers/questionController.js";
import { addCategory, deleteCategory, getCategories, getQuestionsByCategory } from "../controllers/categoryController.js";

const adminRouter = express.Router();

/* CATEGORY */
adminRouter.post("/category", addCategory);
adminRouter.get("/category", getCategories);
adminRouter.delete("/category/:id", deleteCategory);

/* QUESTION */
adminRouter.post("/question", addQuestion);
adminRouter.get("/question/:categoryId", getQuestionsByCategory);

export default adminRouter;
