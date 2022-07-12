/* eslint-disable no-console */
import mongoose from "mongoose";
import { config } from "../config";

export const connectMongo = async () => {
  await mongoose.connect(config.MONGO_URI);

  const mongoConnection = mongoose.connection;
  mongoConnection.on("error", console.error.bind(console, "connection error:"));
  mongoConnection.once("open", () => console.log("Database connected!"));
};
