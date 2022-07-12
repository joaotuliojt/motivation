import { Document, Model, Schema, model } from "mongoose";

interface IUser extends Document {
  email: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
});

export const User: Model<IUser> = model("user", UserSchema);
