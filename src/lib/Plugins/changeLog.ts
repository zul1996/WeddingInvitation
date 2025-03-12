import mongoose, { Schema, Document } from "mongoose";

export interface IChangeLog extends Document {
  modelName: string; 
  documentId: string;
  changedBy: Schema.Types.ObjectId; 
  changes: Record<string, any>; 
  timestamp: Date;
}

const ChangeLogSchema = new Schema<IChangeLog>({
  modelName: { type: String, required: true },
  documentId: { type: String, required: true },
  changedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  changes: { type: Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IChangeLog>("ChangeLog", ChangeLogSchema);
