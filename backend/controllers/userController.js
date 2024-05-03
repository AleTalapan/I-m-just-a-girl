import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import mongoose, { mongo } from "mongoose";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";


const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		//const isAdmin = req.body.isAdmin;  

		const user = await User.findOne({ $or: [{ email }, { username }] });
		if (user) {
			return res.status(400).json({ error: "User already exists" });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
			//isAdmin: isAdmin
		});
		await newUser.save();

		if (newUser) {
			console.log("test"); 
			generateTokenAndSetCookie(newUser._id, res);
			res.status(201).json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username:newUser.username,
				//isAdmin:newUser.isAdmin,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (err) {
		res.status(500).json({ error:  err.message });
		console.log("Error in signupUser: ", err.message);
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });

		//const isAdmin = user.isAdmin;

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			//isAdmin:isAdmin,
			//bio: user.bio,
			//profilePic: user.profilePic,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
		console.log("Error in loginUser: ", error.message);
	}
};

const logoutUser = (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in signupUser: ", err.message);
	}
};



export {logoutUser,signupUser,loginUser};
