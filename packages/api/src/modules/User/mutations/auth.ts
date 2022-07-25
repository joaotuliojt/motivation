import { GraphQLNonNull, GraphQLString } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import { compare } from "bcrypt";
import { User } from "../models/User";
import { createAuthorization } from "../../../utils/jwt";
import UserType from "../UserType";

export default mutationWithClientMutationId({
  name: "Auth",
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email or password invalid");
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error("Email or password invalid");
    }

    const token = await createAuthorization({ id: user._id, roles: [] });
    return {
      user,
      token,
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
    token: {
      type: GraphQLString,
      resolve: ({ token }: { token: string }) => token,
    },
  },
});
