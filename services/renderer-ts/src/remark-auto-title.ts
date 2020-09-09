import grpc from "grpc";
import { Transformer, Attacher } from "unified";
import visit from "unist-util-visit";
import { FetcherClient } from "../pb/fetcher/fetcher_grpc_pb";
import { loadConfig } from "./config";
import { FetchRequest } from "../pb/fetcher/fetcher_pb";

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
    const config = loadConfig();
    const fetcherClient = new FetcherClient(config.fetcherAddr, grpc.credentials.createInsecure());
    await new Promise((resolve, reject) => {
      visit<MarkdownLinkNode>(tree, "link", (node) => {
        if (node.children.length === 0) {
          const fetchRequest = new FetchRequest();
          fetchRequest.setUrl(node.url);
          fetcherClient.fetch(fetchRequest, (err, reply) => {
            if (err) reject(err);
            node.children.push({
              type: "text",
              value: reply.getTitle(),
            });
            resolve();
          });
        }
      });
    });
  };
  return transformer;
};

export default autoTitle;
