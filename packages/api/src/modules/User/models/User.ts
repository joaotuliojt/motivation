import { hash } from "bcrypt";
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
      unique: true,
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
      ref: "motivation",
    },
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line func-names
UserSchema.pre("save", async function (next) {
  const hashedPassword = await hash(this.password, 8);
  this.password = hashedPassword;
  next();
});

export const User: Model<IUser> = model("user", UserSchema);
