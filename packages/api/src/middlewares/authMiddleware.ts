import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../modules/User/models/User";

interface IPayload {
  roles: string[];
  id: string;
}

export async function authMiddleware(resolve, root, args, context, info) {
  try {
    const { authorization }: { authorization: string } = context.header;

    if (!authorization) {
      throw new Error("INVALID TOKEN");
    }

    const token = authorization.replace("Bearer", "").trim();

    if (!config.TK_SECRET) {
      throw new Error("SEND SECRET TOKEN");
    }

    const { id } = jwt.verify(token, config.TK_SECRET, { algorithms: ["HS256"] }) as unknown as IPayload;
    const user = await User.findById(id);
    if (!user) {
      throw new Error("USER DONT EXISTS");
    }
    context.user = { id };
  } catch (error) {
    context.user = null;
  }

  const result = await resolve(root, args, context, info);
  return result;
}
