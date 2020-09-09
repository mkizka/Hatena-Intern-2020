import grpc from "grpc";
import { Transformer, Attacher } from "unified";
import visit from "unist-util-visit";
import { FetcherClient } from "../pb/fetcher/fetcher_grpc_pb";
import { loadConfig } from "./config";
import { FetchRequest } from "../pb/fetcher/fetcher_pb";

type MarkdownNode = {
  type: string;
  title: string | null;
  url: string;
};

const autoTitle: Attacher = () => {
  const config = loadConfig();
  const fetcherClient = new FetcherClient(config.fetcherAddr, grpc.credentials.createInsecure());
  const transformer: Transformer = (tree, _) => {
    visit<MarkdownNode>(tree, "link", (node) => {
      if (!node.title) {
        const fetchRequest = new FetchRequest();
        fetchRequest.setUrl(node.url);
        fetcherClient.fetch(fetchRequest, (err, reply) => {
          console.log(err);
          console.log(reply.getTitle());
        });
      }
    });
  };
  return transformer;
};

export default autoTitle;
