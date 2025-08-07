export type Media = {
  id: string;
  poster: string;
  rate: string;
  title: string;
  year: string;
};
export async function getMovies(start: number = 0): Promise<Array<Media>> {
  let res = await fetch(
    `https://moon-tv-sand-five-73.vercel.app/api/douban/categories?kind=movie&category=热门&type=全部&limit=20&start=${start}`
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

export async function getTVs(start: number = 0): Promise<Array<Media>> {
  let res = await fetch(
    `https://moon-tv-sand-five-73.vercel.app/api/douban/categories?kind=tv&category=tv&type=tv&limit=20&start=${start}`
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

export async function getShows(start: number = 0): Promise<Array<Media>> {
  start = start || 0;
  let res = await fetch(
    `https://moon-tv-sand-five-73.vercel.app/api/douban/categories?kind=tv&category=show&type=show&limit=20&start=${start}`
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

export async function recAnimes(): Promise<Array<Media>> {
  let movies: Array<Media> = [];
  return movies;
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
export async function search(s: string): Promise<Array<Detail>> {
  let ret: any =await fetch("https://moon-tv-sand-five-73.vercel.app/api/search?q=" + encodeURIComponent(s));
  let data = await ret.json().catch(() => ({ results: [] }));
  let list: Detail[] = [];
  for (let i in data.results) {
    let item = ret.results[i];
    let episodesx = item.episodes || [];
    list.push({
      id: item.id,
      title: item.title,
      poster: item.poster,
      year: item.year,
      class: item.class,
      rate: item.rate,
      typeName: item.type_name,
      doubanId: item.doubanId,
      source: item.source,
      sourceName: item.source_name,
      episodes: episodesx,
    });
  }
  return list;
}
