import Koa from "koa";
import api from "./api";
import cors from "@koa/cors";

const app = new Koa();
// 允许跨域
app.use(
  cors({
    origin(ctx) {
      return ctx.get("Origin") || "*";
    },
  })
);

app.use(api.routes()).use(api.allowedMethods());
export default app;
