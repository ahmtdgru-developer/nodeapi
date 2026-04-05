import { SetMetadata } from '@nestjs/common';
import {
  CACHE_RESOURCE_METADATA,
  type CacheResourceConfig,
} from './cache.constants';

export const CacheResource = (config: CacheResourceConfig) =>
  SetMetadata(CACHE_RESOURCE_METADATA, config);
