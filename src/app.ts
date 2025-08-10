import Koa from "koa";
import api from "./api";
import cors from "@koa/cors";

const app = new Koa();
// 允许跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (ctx.method == "OPTIONS") {
    ctx.body = "";
  } else {
    await next();
  }
});

app.use(api.routes()).use(api.allowedMethods());
export default app;
