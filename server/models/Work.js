import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        tags: [
            {
                label: {
                    type: String,
                    required: true,
                },
            },
        ],
        isLatest: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Work", workSchema);
