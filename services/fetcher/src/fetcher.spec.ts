import { fetch } from "./fetcher";

describe("fetcher", () => {
  it("URLからタイトルを取得する", async () => {
    const url = "https://hatenablog.com";
    const title = await fetch(url);
    expect(title).toBe("はてなブログ");
  });

  it("タイトルが取れないURLの場合は空文字を返す", async () => {
    const url = "not-url";
    const title = await fetch(url);
    expect(title).toBe("");
  });
});
