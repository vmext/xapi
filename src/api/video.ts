import Router from "@koa/router";

const routerVideo = new Router();

routerVideo.get("/home", (ctx) => {});
routerVideo.get("/list", (ctx) => {});
routerVideo.get("/s", async (ctx) => {
  let s = (ctx.query.q || "") as string;
  let ret: any = await (await fetch("https://xtv.gorap.vip/api/search?q=" + encodeURIComponent(s)))
    .json()
    .catch((err) => ({ results: [] }));
  let list: any[] = [];
  for (let i in ret.results) {
    let item = ret.results[i];
    let episodesx = item.episodes || [];

    list.push({
      id: item.id,
      title: item.title,
      poster: item.poster,
      year: item.year,
      class: item.class,
      typeName: item.typeName,
      doubanId: item.doubanId,
      source: item.source,
      sourceName: item.sourceName,
      episodes: episodesx,
    });
  }
  let output = {
    code: 200,
    data: {
      list: [],
      count: 0,
    },
  };
  ctx.body = {
    code: 200,
    data: {
      list: list,
    },
  };
});
routerVideo.get("/d", (ctx) => {});

export default routerVideo;