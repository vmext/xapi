import Router from "@koa/router";
import { Media, getMovies, getTVs, getShows, recAnimes, search } from "./video.mode";
const routerVideo = new Router();

//首页
routerVideo.get("/home", async (ctx) => {
  //https://xtv.gorap.vip/api/douban/categories?kind=movie&category=%E7%83%AD%E9%97%A8&type=%E5%85%A8%E9%83%A8&limit=20&start=0
  let movies: Array<Media> = await getMovies();
  let tvs: Array<Media> = await getTVs();
  let shows: Array<Media> = await getShows();
  let animes: Array<Media> = await recAnimes();
  let outout: any = {
    code: 200,
    data: {
      movies: movies,
      tvs: tvs,
      animes: animes,
      shows: shows,
    },
  };

  ctx.body = outout;
});
routerVideo.get("/list", async (ctx) => {
  let output: any = { code: 200 };
  let list: Array<Media> = [];
  let type = (ctx.query.type as string) || "tv";
  let start = parseInt(ctx.query.start as string) || 0;
  switch (type) {
    case "movie":
      list = await getMovies(start);
      break;
    case "show":
      list = await getShows(start);
      break;
    default:
      list = await getTVs(start);
      break;
  }
  output.data = {
    list: list,
  };
  ctx.body = output;
});
routerVideo.get("/s", async (ctx) => {
  let q = (ctx.query.q || "") as string;
  console.info("search", q); 
  let list = await search(q);
  ctx.body = {
    code: 200,
    data: {
      list: list,
    },
  };
});
routerVideo.get("/d", (ctx) => {});

function handleResources(urls: Array<String>): Array<String> {
  /*   let map = new Map();
  for (let i = 0; i < urls.length; i++) {
    //urls[i] = handleResourceURL(urls[i]);
    let url = urls[i];
    let info = new URL(url);
    map.set(info.host, url);
  }
  let list: Array<String> = [];
  map.forEach((value: String, key: String) => list.push(value)); */
  return urls;
}

export default routerVideo;
