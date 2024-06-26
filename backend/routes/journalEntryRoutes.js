import express from "express";
import { createJournalEntry, getJournalEntry,deleteJournalEntry, getJournalFeed} from "../controllers/journalController.js"
import protectRoute from "../middlewares/protectRoute.js"
import protectRouteAdmin from "../middlewares/protectRouteAdmin";

const router=express.Router();

router.post("/create/:month/:day",protectRoute,createJournalEntry)
router.delete("/:createdBy/:month/:day",protectRoute,deleteJournalEntry)
router.get("/:createdBy/:month/:day",protectRoute,getJournalEntry)
router.get("/feed",protectRoute,getJournalFeed)
//router.delete("/:id",protectRoute,deletePost)

export default router;
