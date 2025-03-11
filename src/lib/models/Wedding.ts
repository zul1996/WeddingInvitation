import mongoose, { Schema } from "mongoose";
import { IWedding } from "../interfaces/Wedding";

const WeddingSchema = new Schema<IWedding>({
    groomName: {
        type: String,
        required: true,
    },
    brideName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: Date,
        required: true,
    },
    eventLocaltion: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "weddings",
});

export default mongoose.models.Wedding || mongoose.model<IWedding>("Wedding", WeddingSchema)