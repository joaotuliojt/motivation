import { fromGlobalId, nodeDefinitions } from "graphql-relay";
import { getMotivation } from "../Motivation/MotivationLoader";
import { getUser } from "../User/UserLoader";

const { nodeField, nodeInterface, nodesField } = nodeDefinitions(
  (globalId) => {
    const { id, type } = fromGlobalId(globalId);
    if (type === "User") {
      return getUser(id);
    }
    if (type === "Motivation") {
      return getMotivation(id);
    }
    return null;
  },
  (obj) => {
    if (obj.email) {
      return "User";
    }
    if (obj.author) {
      return "Motivation";
    }
    return undefined;
  }
);

export { nodeInterface, nodeField, nodesField };
