import Router from "@koa/router";
import { Media, getMovies, getTVs, getShows, recAnimes } from "./video.mode";
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
routerVideo.get("/list", (ctx) => {

});
routerVideo.get("/s", async (ctx) => {
  let s = (ctx.query.q || "") as string;
  let ret: any = await (await fetch("https://xtv.gorap.vip/api/search?q=" + encodeURIComponent(s)))
    .json()
    .catch((err) => ({ results: [] }));
  let list: any[] = [];
  for (let i in ret.results) {
    let item = ret.results[i];
    let episodesx = item.episodes || [];
    episodesx = handleResources(episodesx);
    list.push({
      id: item.id,
      title: item.title,
      poster: item.poster,
      year: item.year,
      class: item.class,
      typeName: item.type_name,
      doubanId: item.doubanId,
      source: item.source,
      sourceName: item.source_name,
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
