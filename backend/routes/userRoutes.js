import express from "express";
import {getUserProfile,getMutualFriends,deleteUser,logoutUser, loginUser, signupUser,updateUser,followUnFollowUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
import protectRouteAdmin from "../middlewares/protectRouteAdmin";
const router = express.Router();

router.get("/profile/:username",getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",protectRoute, logoutUser);
router.put("/update/:id",protectRoute,updateUser);
router.delete("/delete/:id",protectRouteAdmin,deleteUser)
router.post("/follow/:id",protectRoute, followUnFollowUser) 
router.get("/mutual-friends", protectRoute, getMutualFriends);



export default router;
