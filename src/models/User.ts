import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/User";
import bcrypt from "bcrypt";
import { auditTrailPlugin } from "../lib/Plugins/auditTrailPlugin";


const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    accessExpiresAt: { type: Date, required: true },
    lastLogin: Date,
    failedLoginAttempts: { type: Number, default: 0 },
  },
  {
    collection: "users",
  }
);

UserSchema.pre<IUser & Document>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.hasAccessExpired = function (): boolean {
  return new Date() > this.accessExpiresAt;
};

UserSchema.plugin(auditTrailPlugin);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
