import { Schema, Document, Query, Model, UpdateQuery } from "mongoose";
import changeLog from "./changeLog";

interface IAuditTrailDocument extends Document {
  createdBy?: Schema.Types.ObjectId;
  updatedBy?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Audit Trail Plugin
export const auditTrailPlugin = (schema: Schema) => {
  // Add createdBy & updatedBy
  schema.add({
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  });

  // Enable Mongoose's built-in timestamps (automatically creates createdAt & updatedAt)
  schema.set("timestamps", true);

  // Middleware before save
  schema.pre<IAuditTrailDocument>("save", function (next) {
    if (this.isNew) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();
    next();
  });

  // Middleware before update
  schema.pre<Query<any, IAuditTrailDocument>>(
    "findOneAndUpdate",
    async function (next) {
      const update = this.getUpdate() as UpdateQuery<IAuditTrailDocument>;
      if (update) {
        if (!update.$set) {
          update.$set = {};
        }
        update.$set.updatedAt = new Date();
      }
      next();
    }
  );

  // Middleware after update to record changes
  schema.post<Query<any, IAuditTrailDocument>>(
    "findOneAndUpdate",
    async function (doc) {
      if (!doc) return;

      const modelName = (doc.constructor as Model<IAuditTrailDocument>)
        .modelName;
      const update = this.getUpdate() as UpdateQuery<IAuditTrailDocument>;

      if (update && update.$set) {
        await changeLog.create({
          modelName,
          documentId: (doc as any)._id,
          changedBy: update.$set.updatedBy || (doc as any).updatedBy,
          changes: update.$set,
        });
      }
    }
  );
};
