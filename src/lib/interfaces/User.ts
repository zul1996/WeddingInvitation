import mongoose from "mongoose";

export interface IUser extends Document {
  // Basic user information
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  // Role and permissions
  role: "superadmin" | "admin" | "user";

  // Account status
  isActive: boolean;
  isEmailVerified: boolean;

  // Access expiration
  accessExpiresAt: Date;

  // Authentication and security
  lastLogin?: Date;
  failedLoginAttempts: number;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  
}
