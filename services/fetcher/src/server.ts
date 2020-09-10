import health from "grpc-health-check";
import winston from "winston";
import request from "superagent";
import { FetchRequest, FetchReply } from "../pb/fetcher/fetcher_pb";
import { IFetcherServer } from "../pb/fetcher/fetcher_grpc_pb";
import { UnaryHandler, unaryHandler, createLoggingMiddleware } from "./server-utils";
import { fetch } from "./fetcher";

export interface Server extends IFetcherServer {
  healthServer: health.IHealthServer;
}

/**
 * サーバー (IFetcherServer) を作成する
 */
export function createServer(logger: winston.Logger): Server {
  const healthServer = new health.Implementation({
    "": health.messages.HealthCheckResponse.ServingStatus.SERVING,
    "fetcher.Fetcher": health.messages.HealthCheckResponse.ServingStatus.SERVING,
  });
  const loggingMiddleware = createLoggingMiddleware(logger);
  return {
    healthServer,
    fetch: unaryHandler(handleRender, loggingMiddleware("fetcher.Fetcher/fetch")),
  };
}

/**
 * fetcher.Fetcher/Fetch に対するハンドラ
 */
export const handleRender: UnaryHandler<FetchRequest, FetchReply> = async (req) => {
  const url = req.getUrl();
  const fetcher = async (url: string) => (await request.get(url)).text;
  const title = await fetch(url, fetcher);
  const reply = new FetchReply();
  reply.setTitle(title);
  return reply;
};
