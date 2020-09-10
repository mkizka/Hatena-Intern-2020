import { Transformer, Attacher } from "unified";
import visit from "unist-util-visit";
import { fetchTitle } from "./fetch-title";
import { MarkdownLinkNode } from "./unified-utils";

const autoTitle: Attacher = () => {
  const transformer: Transformer = async (tree, _) => {
    const promises: Promise<void>[] = [];
    visit<MarkdownLinkNode>(tree, "link", (node) => {
      if (node.children.length === 0) {
        promises.push(fetchTitle(node));
      }
    });
    await Promise.all(promises);
  };
  return transformer;
};

export default autoTitle;
