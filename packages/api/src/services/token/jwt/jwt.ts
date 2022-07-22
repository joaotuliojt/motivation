import jwt from "jsonwebtoken";
import { config } from "../../../config";
import { ICreateToken, TokenAdapter } from "../token-adapter";

export class JwtCreateAuthorizationToken implements TokenAdapter {
  private encode(data: ICreateToken) {
    return jwt.sign(data, config.TK_SECRET);
  }

  async createAuthorization({ _id, roles }: ICreateToken) {
    return this.encode({ _id, roles });
  }
}
