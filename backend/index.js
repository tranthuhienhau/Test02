import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import routerFilm from "./routes/film.js";
import cors from "cors"
// import multer from "multer"
dotenv.config();
const PORT = process.env.PORT
const app = express();
// const upload = multer({ dest: 'uploads/' })
app.use(cors())
app.use(express.json());
app.use("/app/v1",userRouter )
app.use("/app/v2", routerFilm)
mongoose.connect("mongodb://localhost:27017/test02")
app.listen(PORT, ()=>{
    console.log("Server is running")
})