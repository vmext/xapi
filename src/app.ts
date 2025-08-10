import Koa from "koa";
import api from "./api";
import cors from "@koa/cors";

const app = new Koa();
// 允许跨域
app.use(
  cors({
    origin: "*", // 允许所有域名跨域请求，如果你只想允许某几个域名，请写对应的域名字符串或者函数
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);

app.use(api.routes()).use(api.allowedMethods());
export default app;
