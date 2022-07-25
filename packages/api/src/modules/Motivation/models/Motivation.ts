import { Document, Model, Schema, model } from "mongoose";

interface IMotivation extends Document {
  sentence: string;
  author: string;
  userId: Schema.Types.ObjectId;
}

const MotivationSchema = new Schema<IMotivation>(
  {
    sentence: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const Motivation: Model<IMotivation> = model("motivation", MotivationSchema);
