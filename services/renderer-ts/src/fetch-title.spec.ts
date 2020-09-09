import { fetchTitle } from "./fetch-title";

describe("fetchTitle", () => {
  it("fetcherサービスを呼び出してタイトルを取得する", async () => {
    const url = "https://hatenablog.com";
    const title = await fetchTitle(url);
    expect(title).toBe("はてなブログ");
  });
});
