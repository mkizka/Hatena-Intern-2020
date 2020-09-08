import { Transformer, Attacher } from "unified";
import visit from "unist-util-visit";

type HTMLNode = {
  type: string;
  tagName?: string;
  value: string;
  children: HTMLNode[];
  properties?: { [key: string]: any };
};

const githubIcon: Attacher = () => {
  const transformer: Transformer = (tree, _) => {
    visit<HTMLNode>(tree, "element", (node) => {
      node.children = node.children.map((child) => {
        if (child.type !== "text") return child;
        const matched = child.value.match(/\[(\w+)\.icon\]/);
        if (matched) {
          return {
            type: "element",
            tagName: "img",
            value: "",
            children: [],
            properties: {
              src: `https://github.com/${matched[1]}.png`,
              alt: matched[1],
              style: "height: 1.5rem",
            },
          };
        } else {
          return child;
        }
      });
    });
  };
  return transformer;
};

export default githubIcon;
