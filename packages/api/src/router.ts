import Koa from "koa";
import KoaBodyparser from "koa-bodyparser";
import cors from "@koa/cors";
import Router from "koa-router";
import mount from "koa-mount";
import { graphqlHTTP } from "koa-graphql";
import root from "./graphql/root";
import { schema } from "./graphql/schema";

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Welcome to my Koa Server";
  next();
});

app.use(
  mount(
    "/graphql",
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true,
    })
  )
);

app.use(KoaBodyparser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export { app };
