import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import cookieParser from "cookie-parser";



dotenv.config()
connectDB();
const app=express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

