import JournalEntry from "../models/journalEntryModel.js";
import User from "../models/userModel.js";

const createJournalEntry = async (req, res) => {
    try {
        const { username, month, day } = req.params;
        const { entry } = req.body;
  

        if (!username || !month || !day || !entry) {
            return res.status(400).json({ error: "Username, month, day, and entry fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create journal entry" });
        }

        const newJournalEntry = new JournalEntry({ username, month, day, entry });


        await newJournalEntry.save();

        res.status(201).json(newJournalEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
    }
};



const getJournalEntry = async (req, res) => {
    try {
        const { username, month, day } = req.params;
        const journalEntry = await JournalEntry.findOne({ username, month, day });

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
        const { username, month, day } = req.params;
        const journalEntry = await JournalEntry.findOne({ username, month, day });

        if (!journalEntry) {
            return res.status(404).json({ error: "Journal entry not found" });
        }

        if (journalEntry.username.toString() !== req.user.username.toString() && !req.user.isAdmin) {
            return res.status(401).json({ error: "Unauthorized to delete journal entry" });
        }

        await journalEntry.remove();

        res.status(200).json({ message: "Journal entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export { createJournalEntry,getJournalEntry, deleteJournalEntry };
