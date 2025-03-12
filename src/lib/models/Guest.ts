import mongoose, { Schema } from "mongoose";
import { IGuest } from "../interfaces/Guest";
import { auditTrailPlugin } from "./Plugins/auditTrailPlugin";

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
}, {
    collection: "guests",
}
);

GuestSchema.plugin(auditTrailPlugin);

const Guest = mongoose.models.Guest || mongoose.model<IGuest>("Guest", GuestSchema);

export default Guest