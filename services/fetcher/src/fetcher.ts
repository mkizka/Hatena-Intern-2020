import cheerio from "cheerio";
import { cache } from "./cache";

/**
 * 受け取ったURLからタイトルを取得する
 */
export async function fetch(
  url: string,
  fetcher: (url: string) => Promise<string>
): Promise<string> {
  const normalizedUrl = removeFragment(url);
  const cachedTitle = cache.get(normalizedUrl);
  if (typeof cachedTitle !== "undefined") {
    return cachedTitle;
  }
  try {
    const text = await fetcher(normalizedUrl);
    const $ = cheerio.load(text);
    const title = $("title").text();
    cache.set(url, title);
    return title;
  } catch (e) {
    cache.set(url, "");
    return "";
  }
}

/**
 * URLからハッシュ以降を除く
 */
export function removeFragment(url: string): string {
  const hashIndex = url.indexOf("#");
  return hashIndex < 0 ? url : url.slice(0, hashIndex);
}
