import cheerio from "cheerio";
import { cache } from "./cache";

/**
 * 受け取ったURLからタイトルを取得する
 */
export async function fetch(
  url: string,
  fetcher: (url: string) => Promise<string>
): Promise<string> {
  const cachedTitle = cache.get(url);
  if (typeof cachedTitle !== "undefined") {
    return cachedTitle;
  }
  try {
    const text = await fetcher(url);
    const $ = cheerio.load(text);
    const title = $("title").text();
    cache.set(url, title);
    return title;
  } catch (e) {
    cache.set(url, "");
    return "";
  }
}
