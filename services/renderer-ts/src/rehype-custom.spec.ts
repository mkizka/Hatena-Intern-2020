import { render } from "./renderer";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import custom from "./rehype-custom";

describe("render", () => {
  it("アイコン記法をimgタグに変換", async () => {
    const processor = unified()
      .use(markdown, { commonmark: true })
      .use(remark2rehype)
      .use(custom)
      .use(html);
    const userName = "mkizka";
    const { contents } = await processor.process(`[${userName}.icon]`);
    expect(contents).toBe(
      `<p><img src="https://github.com/${userName}.png" alt="${userName}" style="height: 1.5rem"></p>`
    );
  });
});
