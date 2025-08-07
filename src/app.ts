import Koa from "koa";
import api from "./api";

const app = new Koa();

app.use(api.routes()).use(api.allowedMethods());
export default app;
