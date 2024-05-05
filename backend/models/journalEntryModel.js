import mongoose from "mongoose";

const journalEntrySchema = mongoose.Schema(
    {
        username: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
        month: {
            type: Number,
            required: true,
        },
        day: {
            type: Number,
            required: true,
        },
        entry: {
            type: String,
            maxLength: 5000,
        },
        likes: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                },
                userProfilePic: {
                    type: String,
                },
                username: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export default JournalEntry;
