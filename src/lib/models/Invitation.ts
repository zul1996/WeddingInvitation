import mongoose, { Schema } from "mongoose";
import { IInvitation } from "../interfaces/Invitation";

const InvitationSchema = new Schema<IInvitation>({
    guestName: {
        type: String,
        required: true,
    },
    weddingId: {
        type: Schema.Types.ObjectId,
        ref: 'Wedding',
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "attending", "not attending"],
        default: "pending",
    },
});

export default mongoose.models.Guest || mongoose.model<IInvitation>("Invitation", InvitationSchema)