import { GraphQLList, GraphQLObjectType } from "graphql";
import UserType from "../modules/User/UserType";

import * as UserLoader from "../modules/User/UserLoader";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The root of all... queries",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        const data = await UserLoader.getUsers();
        return data;
      },
    },
  },
});

export default QueryType;
