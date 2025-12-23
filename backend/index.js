const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {MongoClient}=require("mongodb")


const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "supersecretkey";


const url="mongodb+srv://piyushshelar10_db_user:vbXofPmn1uGJAUYB@cluster0.84hcptk.mongodb.net/?appName=Cluster0"


// Fake DB
let users = [];

function calculateRank(level) {
  if (level >= 30) return "Diamond";
  if (level >= 20) return "Platinum";
  if (level >= 10) return "Gold";
  if (level >= 5) return "Silver";
  return "Bronze";
}



function getNewBadges(user) {
  const badges = [];

  if (user.stats.quizBattlesWon >= 5) {
    badges.push({ id: 1, icon: "Trophy", label: "Battle Master" });
  }

  if (user.stats.currentStreak >= 7) {
    badges.push({ id: 5, icon: "Shield", label: "Unstoppable" });
  }

  if (user.stats.accountLevel >= 10) {
    badges.push({ id: 6, icon: "User", label: "Veteran Player" });
  }

  return badges;
}

/* REGISTER */
app.post("/register", async (req, res) => {

    let client=new MongoClient(url)
    client.connect()

    const db=client.db("Users")
    const collec=db.collection("details2")
   const { fullName, email, password } = req.body;

   const userExists = await collec.findOne({ email })

  
  
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    fullName,
    email,
    password: hashedPassword
  };

  collec.insertOne(newUser)

  res.json({ message: "Account created successfully" });
});

/* LOGIN */
app.post("/login", async (req, res) => {

    let client=new MongoClient(url)
    client.connect()

    const db=client.db("Users")
    const collec=db.collection("details2")
  
    const { email, password } = req.body;

  const user = await collec.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.fullName,
      email: user.email
    }
  });
});

/* PROTECTED */
app.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Access granted", userId: decoded.userId });
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const client = new MongoClient(url);
    await client.connect();

    const db = client.db("quizapp");
    const collection = db.collection("categories");

    const categories = await collection.find({}).toArray();

    res.status(200).json(categories);

    await client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});



/**
 * ✅ GET USER BY EMAIL
 * /users/m@123
 */
app.get("/users/:email", async (req, res) => {
  try {
    // ✅ FIX IS HERE
    const email = decodeURIComponent(req.params.email);
      let client=new MongoClient(url)
    client.connect()
    const db = client.db("Users")
    const users = db.collection("details2");

    const userDoc = await users.findOne(
      { email },
      { projection: { password: 0 } }
    );

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: userDoc.id,
        name: userDoc.fullName,
        username: userDoc.profile?.username,
        rank: userDoc.profile?.rank,
        avatarIcon: userDoc.profile?.avatarIcon,
        stats: userDoc.stats
      },
      badges: userDoc.badges
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/users/update-progress", async (req, res) => {
  try {
    const { email, xpEarned = 200, isWin = true } = req.body;

    const db = await connectDB();
    const users = db.collection("users");

    const user = await users.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // -------------------------
    // CURRENT STATS
    // -------------------------
    let {
      totalXP = 0,
      xpRequired = 1000,
      quizBattlesWon = 0,
      currentStreak = 0,
      accountLevel = 1
    } = user.stats || {};

    // -------------------------
    // UPDATE LOGIC
    // -------------------------
    totalXP += xpEarned;

    if (isWin) {
      quizBattlesWon += 1;
      currentStreak += 1;
    } else {
      currentStreak = 0; // reset streak on loss
    }

    // -------------------------
    // LEVEL UP LOGIC
    // -------------------------
    while (totalXP >= xpRequired) {
      totalXP -= xpRequired;
      accountLevel += 1;
      xpRequired += 500;
    }

    // -------------------------
    // RANK UPDATE
    // -------------------------
    const rank = calculateRank(accountLevel);

    // -------------------------
    // SAVE TO DB
    // -------------------------
    await users.updateOne(
      { email },
      {
        $set: {
          "stats.totalXP": totalXP,
          "stats.xpRequired": xpRequired,
          "stats.quizBattlesWon": quizBattlesWon,
          "stats.currentStreak": currentStreak,
          "stats.accountLevel": accountLevel,
          "profile.rank": rank
        }
      }
    );

    res.json({
      success: true,
      message: "Progress updated",
      stats: {
        totalXP,
        xpRequired,
        quizBattlesWon,
        currentStreak,
        accountLevel,
        rank
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});







app.listen(9000, () => console.log("Server running on 9000"));
