import { verify } from "jsonwebtoken";
import { config } from "../config";

export function getUser(token: string) {
  try {
    if (!token) {
      return null;
    }
    return verify(token, config.TK_SECRET);
  } catch (error) {
    return null;
  }
}
