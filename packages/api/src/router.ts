import Koa from "koa";
import KoaBodyparser from "koa-bodyparser";
import cors from "@koa/cors";
import Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "Welcome to my Koa Server";
  next();
});

app.use(KoaBodyparser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export { app };
