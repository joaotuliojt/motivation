import { Document, Model, Schema, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  motivations: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    motivations: {
      type: [Schema.Types.ObjectId],
      ref: "motivations",
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = model("user", UserSchema);
