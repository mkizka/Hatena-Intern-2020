import { Transformer, Attacher } from "unified";
import visit from "unist-util-visit";
import { fetchTitle } from "./fetch-title";

type MarkdownTextNode = {
  type: string;
  value: string;
};

type MarkdownLinkNode = {
  type: string;
  url: string;
  children: MarkdownTextNode[];
};

const autoTitle: Attacher = () => {
  const transformer: Transformer = async (tree, _) => {
    const promises: Promise<void>[] = [];
    visit<MarkdownLinkNode>(tree, "link", (node) => {
      if (node.children.length === 0) {
        const promise = fetchTitle(node.url).then((title) => {
          node.children.push({
            type: "text",
            value: title,
          });
        });
        promises.push(promise);
      }
    });
    await Promise.all(promises);
  };
  return transformer;
};

export default autoTitle;
