// import Journal from "../../frontend/src/pages/Journal.jsx";
import JournalEntry from "../models/journalEntryModel.js";
import User from "../models/userModel.js";

const createJournalEntry = async (req, res) => {
    try {
        const {  month, day } = req.params;
        const { createdBy, entry } = req.body;
  

        if (!createdBy || !month || !day || !entry) {
            return res.status(400).json({ error: "createdBy, month, day, and entry fields are required" });
        }

        const user = await User.findOne({ username: createdBy });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const maxLength = 5000;
		if (entry.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}


        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create journal entry" });
        }

        const existingEntry = await JournalEntry.findOne({ createdBy: createdBy, month, day });

        if (existingEntry) {
            // updating the existing entry
            existingEntry.entry = entry;
            await existingEntry.save();
            res.status(200).json(existingEntry);
        } else {
            // new entry
            const newJournalEntry = new JournalEntry({ createdBy: createdBy, month, day, entry });
            await newJournalEntry.save();
            res.status(201).json(newJournalEntry);
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
};



const getJournalEntry = async (req, res) => {
    try {
        const { createdBy, month, day } = req.params;

        const journalEntry = await JournalEntry.findOne({
            createdBy: createdBy,  
            month: month,
            day: day
        });

        if (!journalEntry) {
            return res.status(404).json({ error: "Journal entry not found" });
        }

        res.status(200).json(journalEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteJournalEntry = async (req, res) => {
    try {
        const { createdBy, month, day } = req.params;
        const journalEntry = await JournalEntry.findOne({ createdBy, month, day });
        if (!journalEntry) {
            return res.status(404).json({ error: "Journal entry not found" });
        }

        if (journalEntry.createdBy.toString() !== req.user.username.toString() && !req.user.isAdmin) {
            return res.status(401).json({ error: "Unauthorized to delete journal entry" });
        }

        await journalEntry.deleteOne();

        res.status(200).json({ message: "Journal entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createJournalEntry,getJournalEntry,deleteJournalEntry};
