import Koa from "koa";
import KoaBodyparser from "koa-bodyparser";
import cors from "@koa/cors";
import Router from "koa-router";
import mount from "koa-mount";
import { graphqlHTTP } from "koa-graphql";
import koaPlayground from "graphql-playground-middleware-koa";
import { schema } from "./graphql/schema";

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Welcome to my Koa Server";
  next();
});

const graphqlServer = graphqlHTTP({
  schema,
  graphiql: true,
});

router.all("/graphql", graphqlServer);

router.all(
  "/playground",
  koaPlayground({
    endpoint: "/graphql",
  })
);

app.use(KoaBodyparser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export { app };
