import grpc from "grpc";
import { FetchRequest } from "../pb/fetcher/fetcher_pb";
import { FetcherClient } from "../pb/fetcher/fetcher_grpc_pb";
import { loadConfig } from "./config";
import { MarkdownLinkNode } from "./unified-utils";

export function fetchTitle(node: MarkdownLinkNode): Promise<void> {
  const config = loadConfig();
  const fetcherClient = new FetcherClient(config.fetcherAddr, grpc.credentials.createInsecure());
  const fetchRequest = new FetchRequest();
  fetchRequest.setUrl(node.url);
  return new Promise<void>((resolve, reject) => {
    fetcherClient.fetch(fetchRequest, (err, reply) => {
      if (err) reject(err);
      else {
        node.children.push({
          type: "text",
          value: reply.getTitle(),
        });
        resolve();
      }
    });
  });
}
