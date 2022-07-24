
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTACE = instance;
  process.env.MONGO_URI = uri;

  await mongoose.connect(uri);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
