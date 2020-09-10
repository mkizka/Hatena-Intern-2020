import LRU from "lru-cache";

export const cache = new LRU<string, string>({ max: 500, maxAge: 24 * 60 * 60 });
