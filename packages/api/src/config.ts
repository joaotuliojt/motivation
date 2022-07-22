import "dotenv/config";

export const config = {
  MONGO_URI: process.env.MONGO_URI || "",
  TK_SECRET: process.env.TK_SECRET || "test",
};
