import mongoose, { Schema } from "mongoose";
import { IGuest } from "../interfaces/Guest";

const GuestSchema = new Schema<IGuest>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    invitationId: {
        type: Schema.Types.ObjectId,
        ref: "Invitation",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "attending", "not attending"],
        default: "pending",
    },
});

export default mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);