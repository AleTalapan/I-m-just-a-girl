import express from "express";
import { createJournalEntry, getJournalEntry, deleteJournalEntry} from "../controllers/journalController.js"
import protectRoute from "../middlewares/protectRoute.js"

const router=express.Router();

router.post("/create",protectRoute,createJournalEntry)
router.get("/:id",getJournalEntry)
router.delete("/:id",protectRoute,deleteJournalEntry)


export default router;
