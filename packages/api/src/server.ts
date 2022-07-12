import { connectMongo } from "./database/mongo";
import { app } from "./router";

async function startServer() {
  try {
    await connectMongo();
  } catch (error) {
    throw new Error("Error in mongo connection!");
  }

  app.on("error", (err) => {
    console.log("Server error", err);
  });

  app.listen(3333, () => {
    console.log("Server is running");
  });
}

startServer();
