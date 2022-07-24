import { graphql } from "graphql";
import { connectMongoose, clearDatabase, closeDatabase } from "../../../../test/mongoDb";
import { User } from "../models/User";
import { schema } from "../../../graphql/schema";

describe("Create User tests", () => {
  beforeAll(async () => connectMongoose());
  beforeEach(async () => clearDatabase());
  afterAll(async () => closeDatabase());

  it("should query user", async () => {

    const query = `
      mutation CREATE_USER($name:String! $email:String! $password:String!){
        CreateUser(input: {
          email:$email,
          name: $name,
          password:$password
        }){
          ... on User{
            email
            name
            id
            _id
          }
        }
      }
    `;

    const variables = {
      name: "Jhon Doe",
      email: "jhondoe@email.com",
      password: "iAmTheBest"
    }

    const result = await graphql({ schema, source: query, variableValues: variables });
    expect(result.data).not.toBe(null);
  });
});
