import { hash } from "bcrypt";
import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { User } from "../models/User";
import UserType, { UserEdge } from "../UserType";

export default mutationWithClientMutationId({
  name: "CreateUser",
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, name, password }) => {
    const hashedPassoword = await hash(password, 8);
    const user = await User.create({ email, name, password: hashedPassoword });
    return {
      user,
    };
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => {
        if (!user) {
          return null;
        }
        return user;
      },
    },
  },
});
