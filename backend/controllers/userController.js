import User from "../models/userModel.js";
import FriendRequest from "../models/friendRequestModel.js";
import bcrypt from "bcryptjs"
import mongoose, { mongo } from "mongoose";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import {v2 as cloudinary} from "cloudinary"

const getUserProfile = async (req, res) => {
	
	const { username } = req.params;

		try{
			let user;

			if (mongoose.Types.ObjectId.isValid(username)) {
				user = await User.findOne({ _id: username }).select("-password").select("-updatedAt");
			} else {
				user = await User.findOne({ username: username }).select("-password").select("-updatedAt");
			}

			if (!user) return res.status(404).json({ error: "User not found" });
			
			res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in getUserProfile: ", err.message);
	}
}


const signupUser = async (req, res) => {
	try {
		const { name, email, username, password } = req.body;
		const isAdmin = req.body.isAdmin;  

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
			isAdmin: isAdmin
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
				isAdmin:newUser.isAdmin,
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

		const isAdmin = user.isAdmin;

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			isAdmin:isAdmin,
			bio: user.bio,
			profilePic: user.profilePic,
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


const deleteUser = async (req, res) => {
	try {

	  const {id}=req.params;
	  const userToDelete = await User.findById(id);
	  const currentUser = await User.findById(req.user._id);

	  if (!currentUser.isAdmin) {
		return res.status(403).json({ error: "Only admins can delete users" });
	  }

	  
	  if (id === req.user._id.toString())
	  return res.status(400).json({ error: "You cannot delete your own profile!" });

	  if (!userToDelete || !currentUser) 
	  return res.status(400).json({ error: "User not found" });

  
	  await User.findByIdAndDelete(userToDelete._id);
	  await Post.deleteMany({ postedBy: userToDelete._id });
  
	  res.status(200).json({ message: "User deleted successfully" });
	} catch (err) {
	  res.status(500).json({ error: err.message });
	  console.log("Error in deleteUser", err.message);
	}
  };


const addFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const userToFriend = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString())
            return res.status(400).json({ error: "You cannot add yourself as a friend" });

        if (!userToFriend || !currentUser)
            return res.status(400).json({ error: "User not found" });

        const existingRequest = await FriendRequest.findOne({ from: req.user._id, to: id });
        if (existingRequest)
            return res.status(400).json({ error: "Friend request already sent" });

        const newRequest = new FriendRequest({ from: req.user._id, to: id });
        await newRequest.save();
        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error adding friend", err.message);
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await FriendRequest.findById(requestId);

        if (!request)
            return res.status(400).json({ error: "Friend request not found" });

        if (request.to.toString() !== req.user._id.toString())
            return res.status(403).json({ error: "You are not authorized to accept this friend request" });

        await User.findByIdAndUpdate(request.to, { $push: { friends: request.from } });
        await User.findByIdAndUpdate(request.from, { $push: { friends: request.to } });

        await FriendRequest.findByIdAndDelete(requestId);

        res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error accepting friend request ", err.message);
    }
};


const removeFriend = async (req, res) => {
    try {
        const { id } = req.params;
        const userToRemove = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (!userToRemove || !currentUser)
            return res.status(400).json({ error: "User not found" });

        if (!currentUser.friends.includes(id))
            return res.status(400).json({ error: "User is not your friend" });

        currentUser.friends.pull(id);
        await currentUser.save();

        userToRemove.friends.pull(req.user._id);
        await userToRemove.save();

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error in removeFriend: ", err.message);
    }
};

const updateUser = async (req, res) => {
	const { name, email, username, password,bio } = req.body;
	let {profilePic}=req.body

	const userId = req.user._id;

	try {
		let user = await User.findById(userId);
		if (!user) 
		return res.status(400).json({ error: "User not found" });

		if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot update other user's profile" });
 
		if (password) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			user.password = hashedPassword;
		}

		if (profilePic) {
			if (user.profilePic) {
			await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
			}

		 	const uploadedResponse = await cloudinary.uploader.upload(profilePic);
		 	profilePic = uploadedResponse.secure_url;
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.username = username || user.username;
		user.profilePic = profilePic || user.profilePic;
		user.bio = bio || user.bio;

		user = await user.save();
		
		user.password = null;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ error:  err.message });
		console.log("Error in updateUser: ", err.message);
	}
};

const getFeedPosts = async (req, res) => {
//implementare pt paginile de jurnal din feed
};


export {getUserProfile,deleteUser,getFeedPosts, updateUser, signupUser, loginUser, logoutUser, addFriend, acceptFriendRequest, removeFriend };