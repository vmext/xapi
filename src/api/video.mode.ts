import { isDev } from "../util";

export type Media = {
  id: string;
  poster: string;
  rate: string;
  title: string;
  year: string;
};
const moontvDomain = isDev() ? "xtv.gorap.vip" : "moon-tv-sand-five-73.vercel.app"; //xtv.gorap.vip

console.info("env--", process.env.NODE_ENV);
export async function getMovies(start: number = 0, limit: number = 20): Promise<Array<Media>> {
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=movie&category=热门&type=全部&limit=${limit}&start=${start}`
  );
  let data: any = await res.json().catch((err: Error) => ({ code: 500, msg: err.message }));
  let movies: Array<Media> = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item: any) => {
      movies.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year,
      });
    });
  }
  return movies;
}

export async function getTVs(start: number = 0, limit: number = 20): Promise<Array<Media>> {
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=tv&category=tv&type=tv&limit=${limit}&start=${start}`
  );
  let data: any = await res.json().catch((err: Error) => ({ code: 500, msg: err.message }));
  let movies: Array<Media> = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item: any) => {
      movies.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year,
      });
    });
  }
  return movies;
}

export async function getShows(start: number = 0, limit: number = 20): Promise<Array<Media>> {
  start = start || 0;
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=tv&category=show&type=show&limit=${limit}&start=${start}`
  );
  let data: any = await res.json().catch((err: Error) => ({ code: 500, msg: err.message }));
  let list: Array<Media> = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item: any) => {
      list.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year,
      });
    });
  }
  return list;
}

export async function getAnimes(start: number = 0, limit: number = 20): Promise<Array<Media>> {
  start = start || 0;
  let res = await fetch(
    `https://${moontvDomain}/api/douban/categories?kind=tv&category=${encodeURIComponent("热门")}&type=tv_animation&limit=${limit}&start=${start}`
  );
  let data: any = await res.json().catch((err: Error) => ({ code: 500, msg: err.message }));
  let list: Array<Media> = [];
  if (data.code == 200 && data.list && data.list.length > 0) {
    data.list.forEach((item: any) => {
      list.push({
        id: item.id,
        poster: item.poster,
        rate: item.rate,
        title: item.title,
        year: item.year,
      });
    });
  }
  return list;
}
type Detail = {
  id: string;
  poster: string;
  rate: string;
  title: string;
  year: string;
  class: string;
  typeName: string;
  doubanId: string;
  source: string;
  sourceName: string;
  episodes: Array<any>;
};
export async function search(q: string): Promise<Array<Detail>> {
  let ret: any = await fetch(`https://${moontvDomain}/api/search?q=${encodeURIComponent(q)}`);
  let data = await ret.json().catch(() => ({ results: [] }));
  let list: Detail[] = [];
  list = data.results
    .filter((item: any) => item.episodes && item.episodes.length > 0)
    .map((item: any) => {
      let episodesx = item.episodes || [];
      return {
        id: item.id,
        title: item.title,
        poster: item.poster,
        year: item.year,
        cata: item.class,
        //rate: item.rate,
        type: item.type_name,
        doubanId: item.doubanId,
        source: item.source,
        sourceName: item.source_name,
        episodes: episodesx,
        //douban_id: item.douban_id,
      };
    });

  return list;
}
