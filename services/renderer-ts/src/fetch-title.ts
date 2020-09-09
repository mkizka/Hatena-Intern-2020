import grpc from "grpc";
import { FetchRequest } from "../pb/fetcher/fetcher_pb";
import { FetcherClient } from "../pb/fetcher/fetcher_grpc_pb";
import { loadConfig } from "./config";

export async function fetchTitle(url: string): Promise<string> {
  const config = loadConfig();
  const fetcherClient = new FetcherClient(config.fetcherAddr, grpc.credentials.createInsecure());
  const fetchRequest = new FetchRequest();
  fetchRequest.setUrl(url);
  return new Promise<string>((resolve, reject) => {
    fetcherClient.fetch(fetchRequest, (err, reply) => {
      if (err) reject(err);
      else resolve(reply.getTitle());
    });
  });
}
