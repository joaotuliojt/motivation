import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../../User/models/User";
import { Motivation } from "../models/Motivation";
import MotivationType from "../MotivationType";

export default mutationWithClientMutationId({
  name: "MotivationCreate",
  inputFields: {
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    sentence: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ author, sentence }, ctx) => {
    const user = ctx?.user;
    if (!user) {
      throw new Error("You are not logged in");
    }

    const motivation = await Motivation.create({ author, sentence, userId: user.id });
    await User.updateOne(
      { _id: user.id },
      {
        $push: {
          motivations: motivation._id,
        },
      }
    );

    return { motivation };
  },
  outputFields: {
    motivation: {
      type: MotivationType,
      resolve: ({ motivation }) => {
        if (!motivation) {
          return null;
        }
        return motivation;
      },
    },
  },
});
