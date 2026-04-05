import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import {
  POSTS_CACHE_DEFAULT_VERSION,
  POSTS_CACHE_VERSION_KEY,
} from './posts-cache.constants';

@Injectable()
export class PostsCacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getVersion(): Promise<number> {
    const version = await this.cacheManager.get<number>(POSTS_CACHE_VERSION_KEY);
    return version ?? POSTS_CACHE_DEFAULT_VERSION;
  }

  async bumpVersion(): Promise<number> {
    const nextVersion = (await this.getVersion()) + 1;
    await this.cacheManager.set(POSTS_CACHE_VERSION_KEY, nextVersion);
    return nextVersion;
  }
}
