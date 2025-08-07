import Koa from "koa";
import api from "./api";

const app = new Koa();

app.use(api.routes()).use(api.allowedMethods);
/* app.use(async (ctx) => {
  console.info("zip=------------")
  let data = zip.encode(ctx.body);
  // 设置响应头
  ctx.set("Content-Encoding", "zstd"); // ✅ 告诉客户端使用了 Zstd 编码
  ctx.set("Content-Type", "application/json"); // 根据返回数据类型设置
  ctx.set("Content-Length", String(data.length));
  ctx.body = Buffer.from(data);
}); */
export default app;
