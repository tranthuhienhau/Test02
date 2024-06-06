import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import routerFilm from "./routes/film.js";
import cors from "cors"
dotenv.config();
const PORT = process.env.PORT
const app = express();
const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/app/v1",userRouter )
app.use("/app/v2", routerFilm)
mongoose.connect("mongodb://localhost:27017/test02")
app.listen(PORT, ()=>{
    console.log("Server is running")
})