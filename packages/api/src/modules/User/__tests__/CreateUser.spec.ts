import { graphql } from "graphql";
import { fromGlobalId } from "graphql-relay";
import { connectMongoose, clearDatabase } from "../../../../test/mongoDb";
import { schema } from "../../../graphql/schema";

describe("Create User tests", () => {
  beforeAll(async () => connectMongoose());
  beforeEach(async () => clearDatabase());

  it("should query user", async () => {

    const query = `
      mutation CREATE_USER($name:String! $email:String! $password:String!){
        CreateUser(input: {
          email:$email,
          name: $name,
          password:$password
        }){
          ... on CreateUserPayload{
            user{
              email
              name
              id
              _id
            }
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
    const { user } = result.data?.CreateUser as any;
    expect(user).not.toBeFalsy();
  });
});
