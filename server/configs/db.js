// import mongoose from "mongoose";

// export const ConnectDB = async () => {
//     await mongoose.connect(`${process.env.MONGODB_URL}/skillduel`).then(()=>console.log("DataBase Connected 👍"))
// }

import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}/skillduels` // ✅ DATABASE NAME
    );
    console.log("Connected to skillduels database 👍");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    process.exit(1);
  }
};
