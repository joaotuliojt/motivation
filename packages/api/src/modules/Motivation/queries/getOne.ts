import { GraphQLFieldConfig, GraphQLID, GraphQLNonNull } from "graphql";
import MotivationType from "../MotivationType";
import * as MotivationLoaders from "../MotivationLoader";

export const motivation: GraphQLFieldConfig<any, any, any> = {
  type: MotivationType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_, { id }) => {
    const data = await MotivationLoaders.getMotivation(id);
    return data;
  },
};
