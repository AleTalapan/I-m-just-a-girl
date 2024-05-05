import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js";
import journalEntryRoutes from "./routes/journalEntryRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary"

dotenv.config()
connectDB();
const app=express();

const PORT = process.env.PORT || 3000;

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});



app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);
app.use("/api/journal",journalEntryRoutes);


app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));

