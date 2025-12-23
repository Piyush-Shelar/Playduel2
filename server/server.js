import "dotenv/config"
import express from "express";
import cors from "cors"
import { ConnectDB } from "./configs/db.js";


const app = express()


app.use(express.json())
app.use(cors())

ConnectDB()

app.get("/",(req,res)=>{
    res.send("Server is Running ! ")
})



const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{console.log(`Server is live at port ${PORT}`)})