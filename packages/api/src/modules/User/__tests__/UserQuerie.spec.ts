import { graphql } from "graphql";
import { connectMongoose, clearDatabase, closeDatabase } from "../../../../test/mongoDb";
import { User } from "../models/User";
import { schema } from "../../../graphql/schema";

describe("Create user tests", () => {
  beforeAll(async () => connectMongoose());
  beforeEach(async () => clearDatabase());
  afterAll(async () => closeDatabase());

  it("should query user", async () => {
    const user = await User.create({
      email: "jhondoe@email.com",
      password: "123456",
      name: "Jhon Doe",
    });

    const query = `
      query GET_USER($id:ID!){
        user(id:$id){
          name
          _id
          id
          email
        }
      }
    `;

    const variables = {
      id: String(user._id),
    }

    const result = await graphql({ schema, source: query, variableValues: variables });
    expect(result.data.user).not.toBe(null)
  });
});
