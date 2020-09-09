import request from "superagent";
import cheerio from "cheerio";

/**
 * 受け取ったURLからタイトルを取得する
 */
export async function fetch(url: string): Promise<string> {
  try {
    const response = await request.get(url);
    const $ = cheerio.load(response.text);
    return $("title").text();
  } catch (e) {
    return "";
  }
}
