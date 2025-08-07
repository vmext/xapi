export type Media = {
  id: string;
  poster: string;
  rate: string;
  title: string;
  year: string;
};
export async function getMovies(start:number=0): Promise<Array<Media>> {
  let res = await fetch(
    `https://xtv.gorap.vip/api/douban/categories?kind=movie&category=热门&type=全部&limit=20&start=${start}`
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

export async function getTVs(start: number=0): Promise<Array<Media>> {
    let res = await fetch(
      `https://xtv.gorap.vip/api/douban/categories?kind=tv&category=tv&type=tv&limit=20&start=${start}`
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
  

export async function getShows(start: number=0): Promise<Array<Media>> {
    start = start || 0
    let res = await fetch(
      `https://xtv.gorap.vip/api/douban/categories?kind=tv&category=show&type=show&limit=20&start=${start}`
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
  