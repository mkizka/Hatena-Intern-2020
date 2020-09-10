import { fetch, removeFragment } from "./fetcher";
import { cache } from "./cache";

describe("fetcher", () => {
  beforeEach(() => {
    cache.reset();
  });

  it("URLからタイトルを取得する", async () => {
    const url = "https://hatenablog.com";
    const fetcher = jest.fn().mockResolvedValue("<title>はてなブログ</title>");
    const title = await fetch(url, fetcher);
    expect(title).toBe("はてなブログ");
  });

  it("タイトルが取れないか、不正なURLの場合は空文字を返す", async () => {
    const url = "not-url";
    const fetcher = jest.fn().mockResolvedValue("<html></html>");
    const title = await fetch(url, fetcher);
    expect(title).toBe("");
  });

  it("同一URLで複数回要求された場合はキャッシュから返す", async () => {
    const url = "https://hatenablog.com";
    const fetcher = jest.fn().mockResolvedValue("<title>はてなブログ</title>");
    await fetch(url, fetcher);
    await fetch(url, fetcher);
    expect(fetcher).toBeCalledTimes(1);
  });

  it("フラグメントは同一URLとして扱う", async () => {
    const url = "https://hatenablog.com";
    const fetcher = jest.fn().mockResolvedValue("<title>はてなブログ</title>");
    await fetch(url, fetcher);
    await fetch(`${url}#fragment`, fetcher);
    expect(fetcher).toBeCalledTimes(1);
  });

  it("GETクエリパラメータは異なるURLとして扱う", async () => {
    const url = "https://hatenablog.com";
    const fetcher = jest.fn().mockResolvedValue("<title>はてなブログ</title>");
    await fetch(url, fetcher);
    await fetch(`${url}?param=value`, fetcher);
    expect(fetcher).toBeCalledTimes(2);
  });

  it("URLのハッシュ以降を削除する", () => {
    const url = "https://hatenablog.com";
    expect(removeFragment(url)).toBe(url);
    expect(removeFragment(`${url}#fragment`)).toBe(url);
  });
});
