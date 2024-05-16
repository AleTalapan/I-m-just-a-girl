import express from "express";
import { createJournalEntry, getJournalEntry,deleteJournalEntry} from "../controllers/journalController.js"
import protectRoute from "../middlewares/protectRoute.js"

const router=express.Router();

router.post("/create/:month/:day",protectRoute,createJournalEntry)
router.delete("/:createdBy/:month/:day",protectRoute,deleteJournalEntry)
router.get("/:createdBy/:month/:day",protectRoute,getJournalEntry)

export default router;
