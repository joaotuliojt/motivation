import { graphql } from "graphql";
import { fromGlobalId } from "graphql-relay";
import { connectMongoose, clearDatabase, closeDatabase } from "../../../../test/mongoDb";
import { schema } from "../../../graphql/schema";

describe("Create User tests", () => {
  beforeAll(async () => await connectMongoose());
  beforeEach(async () => await clearDatabase())
  afterAll(async () => await clearDatabase())

  it("should create a user", async () => {
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
  beforeEach(async () => clearDatabase())

  it("should throw a error if have equals emails", async () => {

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

    const user = {
      name: "Jhon Doe",
      email: "jhondoe@email.com",
      password: "iAmTheBest"
    }

    const createUserFn = async () => {
      return await graphql({ schema, source: query, variableValues: user });
    }

    await createUserFn();
    const resultWithError = await createUserFn();

    const { errors } = resultWithError;
    expect(errors[0].message).toEqual("This email is already in use")
  })
});
