import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import githubIcon from "./rehype-github-icon";

/**
 * 受け取った文書を HTML に変換する
 */
export async function render(src: string): Promise<string> {
  const processor = unified()
    .use(markdown, { commonmark: true })
    .use(remark2rehype)
    .use(githubIcon)
    .use(html);
  const { contents } = await processor.process(src);
  if (contents instanceof Uint8Array) {
    return new TextDecoder().decode(contents);
  } else {
    return contents;
  }
}
