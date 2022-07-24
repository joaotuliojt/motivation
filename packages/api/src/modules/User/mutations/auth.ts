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
      return {
        user: null,
        error: "User dont exists",
        success: null,
        token: null,
      };
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      return {
        user: null,
        error: "Email or Password incorrect",
        success: null,
        token: null,
      };
    }

    const token = await createAuthorization({ id: user._id, roles: [] });
    return {
      user,
      error: null,
      success: "User authenticated",
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
    error: {
      type: GraphQLString,
      resolve: ({ error }: { error: string }) => error,
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }: { success: string }) => success,
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }: { token: string }) => token,
    },
  },
});
