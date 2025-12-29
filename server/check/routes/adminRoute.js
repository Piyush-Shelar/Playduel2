import express from "express";
import { addCategory, addQuestion, deleteCategory } from "../controllers/questionController.js";


const adminRouter = express.Router()

adminRouter.post("/add-question",addQuestion)
adminRouter.post("/add-category",addCategory)
adminRouter.post("/remove-cat",deleteCategory)

export default adminRouter;
