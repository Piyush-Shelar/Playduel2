import "dotenv/config"
import express from "express";
import cors from "cors"
import { ConnectDB } from "./configs/db.js";
import gameRoutes from "./routes/game.routes.js";
import adminRouter from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js";

const app = express()


app.use(express.json())
app.use(cors())
app.use("/api/game",gameRoutes)



ConnectDB()
//api endpoints
app.use("/api/manage",adminRouter)
app.use("/api/users", userRoutes);

app.get("/",(req,res)=>{
    res.send("Server is Running ! ")
})



const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{console.log(`Server is live at port ${PORT}`)})
// app.listen(PORT,()=>{console.log(`Server is ready`)})


