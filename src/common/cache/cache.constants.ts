export const CACHE_RESOURCE_METADATA = 'cache:resource';
export const CACHE_DEFAULT_TTL_MS = 60_000;

export type CacheResourceConfig = {
  namespace: string;
  ttlEnvVar?: string;
};
