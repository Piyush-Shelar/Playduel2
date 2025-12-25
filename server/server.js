import "dotenv/config"
import express from "express";
import cors from "cors"
import { ConnectDB } from "./configs/db.js";
import gameRoutes from "./routes/game.routes.js";


const app = express()


app.use(express.json())
app.use(cors())
app.use("/api/game",gameRoutes)



ConnectDB()

app.get("/",(req,res)=>{
    res.send("Server is Running ! ")
})



const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{console.log(`Server is live at port ${PORT}`)})
// app.listen(PORT,()=>{console.log(`Server is ready`)})


