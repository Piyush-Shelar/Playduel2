import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  // getFriends,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URL;



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

// router.get("/friends", protect, getFriends);;



router.get("/friends", async (req, res) => {
  const client = new MongoClient(url);

  try {
    await client.connect();
    // const db = client.db("Users");
    // const collec = db.collection("details");

    const db = client.db("skillduels");
    const collec = db.collection("users");

    const people = await collec.find({}).toArray();

    const result = people.map(user => ({
      friend_id: user.id,
      fullName: user.fullName,
      email: user.email
    }));

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    // console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    await client.close();
  }
});



export default router;

