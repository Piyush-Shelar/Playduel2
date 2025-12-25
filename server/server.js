import "dotenv/config"
import express from "express";
import cors from "cors"
import { ConnectDB } from "./configs/db.js";
import adminRouter from "./routes/adminRoute.js";


const app = express()


app.use(express.json())
app.use(cors())

ConnectDB()
//api endpoints
app.use("/api/manage",adminRouter)

app.get("/",(req,res)=>{
    res.send("Server is Running ! ")
})



const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{console.log(`Server is live at port ${PORT}`)})