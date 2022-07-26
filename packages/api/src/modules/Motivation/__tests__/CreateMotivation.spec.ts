import { graphql } from "graphql";
import { connectMongoose, clearDatabase, closeDatabase } from "../../../../test/mongoDb";
import { schema } from "../../../graphql/schema";
import { createUser } from "../../User/fixtures/createUser";


describe("Create motivation tests", () => {
  beforeAll(async () => await connectMongoose());
  beforeEach(async () => await clearDatabase())
  afterAll(async () => await closeDatabase())

  it("should be create a new motivation", async () => {
    const user = await createUser();


    const query = `
    mutation CREATE_MOTIVATION($author: String! $sentence:String!){
      CreateMotivation(input: {
        author:$author
        sentence:$sentence
      }){
        motivation{
          id
          sentence
          author
        }
      }
    }`

    const variables = {
      sentence: "A persistência é o caminho do êxito.",
      author: "Charles Chaplin"
    }

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
      contextValue: {
        user: {
          id: user._id
        }
      }
    });
    const { motivation } = result.data?.CreateMotivation as any;
    expect(motivation.id).toBeDefined();
    expect(motivation.sentence).toBe(variables.sentence);
    expect(motivation.author).toBe(variables.author);
  })

  it("should not allow create a motivation if doesn't have authorization header", async () => {
    const query = `
    mutation CREATE_MOTIVATION($author: String! $sentence:String!){
      CreateMotivation(input: {
        author:$author
        sentence:$sentence
      }){
        motivation{
          id
          sentence
          author
        }
      }
    }`

    const variables = {
      sentence: "A persistência é o caminho do êxito.",
      author: "Charles Chaplin"
    }

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
    });

    console.log(result)
    expect(result?.data?.communityCreate).toBeUndefined();
    expect(result?.errors).toBeDefined();
    expect(result.errors && result.errors[0]?.message).toBe(
      'You are not logged in',
    );
  })
})
