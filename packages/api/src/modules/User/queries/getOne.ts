import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from "graphql";
import * as UserLoaders from "../UserLoader";
import UserType from "../UserType";

export const user: GraphQLFieldConfig<any, any, any> = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    const data = await UserLoaders.getUser(id);
    return data;
  },
};
