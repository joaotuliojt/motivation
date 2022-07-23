import mongoose from "mongoose";

async function connectMongoose() {
  await mongoose.connect(process.env.MONGO_URI);
}

async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  const instance = global.__MONGOINSTACE;
  await instance.stop();
}

async function clearDatabase() {
  jest.setTimeout(20000);
  const { db } = mongoose.connection;
  await db.dropDatabase();
}

export { connectMongoose, clearDatabase, closeDatabase };
