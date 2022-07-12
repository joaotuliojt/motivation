import { Document, Model, Schema, model } from "mongoose";

interface IMotivation extends Document {
  sentence: string;
  author: string;
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
  },
  {
    timestamps: true,
  }
);

export const Motivation: Model<IMotivation> = model("motivation", MotivationSchema);
