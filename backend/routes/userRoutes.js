import express from "express";
import {deleteUser,logoutUser, loginUser, signupUser, addFriend, acceptFriendRequest, removeFriend, updateUser } from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
import protectRouteAdmin from "../middlewares/protectRouteAdmin";
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",protectRoute, logoutUser);
router.put("/update/:id",protectRoute,updateUser);
router.delete("/delete/:id",protectRouteAdmin,deleteUser)
router.post("/friend/add/:id", protectRoute, addFriend)
router.put("/friend/accept/:requestId", protectRoute, acceptFriendRequest);
router.delete("/friend/remove/:id", protectRoute, removeFriend);

export default router;
