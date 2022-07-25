import { Types } from "mongoose";
import { Motivation } from "./models/Motivation";

export async function getMotivation(id: string) {
  const motivation = await Motivation.findOne({ _id: new Types.ObjectId(id) });
  return motivation;
}
