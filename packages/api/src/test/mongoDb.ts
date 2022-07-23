import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = new MongoMemoryServer();

export async function connectMongoose() {
  const uri = mongod.getUri();
  /* const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  }; */

  await mongoose.connect(uri);
}

export async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

export async function clearDatabase() {
  const { db } = mongoose.connection;
  await db.dropDatabase();
}
