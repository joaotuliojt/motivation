import jwt from "jsonwebtoken";
import { config } from "../config";

interface ICreateToken {
  id: string;
  roles: string[];
}
export async function createAuthorization(data: ICreateToken) {
  const token = jwt.sign(data, config.TK_SECRET, {
    expiresIn: "1d",
  });
  return token;
}
