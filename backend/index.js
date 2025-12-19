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

/* REGISTER */
app.post("/register", async (req, res) => {

    let client=new MongoClient(url)
    client.connect()

    const db=client.db("Users")
    const collec=db.collection("details")
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
    const collec=db.collection("details")
  
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




app.listen(9000, () => console.log("Server running on 9000"));
app.listen(9000, () => console.log("Server ready"));
