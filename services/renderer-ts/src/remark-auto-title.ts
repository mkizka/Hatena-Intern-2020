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
    await new Promise((resolve, reject) => {
      visit<MarkdownLinkNode>(tree, "link", (node) => {
        if (node.children.length === 0) {
          fetchTitle(node.url)
            .then((title) => {
              node.children.push({
                type: "text",
                value: title,
              });
              resolve();
            })
            .catch((err) => reject(err));
        }
      });
    });
  };
  return transformer;
};

export default autoTitle;
