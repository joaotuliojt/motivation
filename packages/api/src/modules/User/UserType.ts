import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import { IUser } from "./models/User";

export const UserType = new GraphQLObjectType<IUser>({
  name: "User",
  description: "User model",
  fields: {
    email: {
      type: GraphQLString,
      description: "Email of user",
    },
    name: {
      type: GraphQLString,
      description: "User name",
    },
    password: {
      type: GraphQLString,
    },
    motivations: {
      type: GraphQLID,
    },
  },
});
