import { fetch } from "./fetcher";

describe("fetcher", () => {
  it("URLからタイトルを取得する", async () => {
    const url = "https://hatenablog.com";
    const title = await fetch(url);
    expect(title).toBe("はてなブログ");
  });
});
