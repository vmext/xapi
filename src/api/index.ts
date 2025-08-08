import Router from "@koa/router";
import apiVideo from "./video";

const router = new Router();

router.get("/", (ctx) => {
  ctx.body = { msg: "" };
});

router.get("/ping", (ctx) => {
  ctx.body = { msg: "pong" };
});

router.use("/api/v", apiVideo.routes()).use(apiVideo.allowedMethods());

export default router;
