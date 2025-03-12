import mongoose, { Schema } from "mongoose";
import { IWedding } from "../interfaces/Wedding";
import { auditTrailPlugin } from "./Plugins/auditTrailPlugin";

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
    collection: "weddings",
});

WeddingSchema.plugin(auditTrailPlugin);

export default mongoose.models.Wedding || mongoose.model<IWedding>("Wedding", WeddingSchema)