import mongoose, { Schema } from "mongoose";
import { IInvitation } from "../interfaces/Invitation";
import { auditTrailPlugin } from "../lib/Plugins/auditTrailPlugin";

const InvitationSchema = new Schema<IInvitation>({
    guestName: {
        type: Schema.Types.ObjectId,
        ref: 'Guest',
        required: true,
        unique: true,
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
},{
    collection: "invitations",
});

InvitationSchema.plugin(auditTrailPlugin)

export default mongoose.models.Guest || mongoose.model<IInvitation>("Invitation", InvitationSchema)