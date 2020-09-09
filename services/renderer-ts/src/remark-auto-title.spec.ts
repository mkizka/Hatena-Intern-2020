import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import autoTitle from "./remark-auto-title";

describe("autoTitle", () => {
  it("タイトル未指定のリンクタイトルを取得", async () => {
    const processor = unified()
      .use(markdown, { commonmark: true })
      .use(autoTitle)
      .use(remark2rehype)
      .use(html);
    const url = "https://hatenablog.com";
    const title = "はてなブログ";
    const { contents } = await processor.process(`[](${url})`);
    expect(contents).toBe(`<p><a href="${url}">${title}</p>`);
  });
});
