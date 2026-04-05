import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { CacheMetricsService } from './cache-metrics.service';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly cacheMetricsService: CacheMetricsService,
  ) {}

  async get<T>(namespace: string, key: string): Promise<T | undefined> {
    try {
      const value = await this.rawGet<T>(key);

      if (value === undefined || value === null) {
        this.cacheMetricsService.record(namespace, 'miss');
        return undefined;
      }

      this.cacheMetricsService.record(namespace, 'hit');
      return value;
    } catch (error) {
      this.cacheMetricsService.record(namespace, 'error');
      this.logger.warn(
        `Cache read failed for namespace="${namespace}" key="${key}": ${this.formatError(error)}`,
      );
      return undefined;
    }
  }

  async set<T>(namespace: string, key: string, value: T, ttl: number): Promise<void> {
    try {
      await this.rawSet(key, value, ttl);
      this.cacheMetricsService.record(namespace, 'write');
    } catch (error) {
      this.cacheMetricsService.record(namespace, 'error');
      this.logger.warn(
        `Cache write failed for namespace="${namespace}" key="${key}": ${this.formatError(error)}`,
      );
    }
  }

  async getVersion(namespace: string): Promise<number> {
    try {
      const version = await this.rawGet<number>(this.getVersionKey(namespace));
      return version ?? 1;
    } catch (error) {
      this.logger.warn(
        `Cache version read failed for namespace="${namespace}": ${this.formatError(error)}`,
      );
      return 1;
    }
  }

  async bumpVersions(namespaces: string[]): Promise<void> {
    const uniqueNamespaces = Array.from(new Set(namespaces));

    await Promise.all(
      uniqueNamespaces.map(async (namespace) => {
        const nextVersion = (await this.getVersion(namespace)) + 1;
        try {
          await this.rawSet(this.getVersionKey(namespace), nextVersion);
        } catch (error) {
          this.cacheMetricsService.record(namespace, 'error');
          this.logger.warn(
            `Cache invalidation failed for namespace="${namespace}": ${this.formatError(error)}`,
          );
          return;
        }

        this.cacheMetricsService.record(namespace, 'invalidate');
      }),
    );
  }

  async checkConnection(): Promise<boolean> {
    const probeKey = `health:cache:${Date.now()}`;

    try {
      await this.cacheManager.set(probeKey, 'ok', 5_000);
      const value = await this.cacheManager.get<string>(probeKey);
      await this.cacheManager.del(probeKey);
      return value === 'ok';
    } catch (error) {
      this.logger.warn(`Cache healthcheck failed: ${this.formatError(error)}`);
      return false;
    }
  }

  private getVersionKey(namespace: string): string {
    return `${namespace}:cache:version`;
  }

  private async rawGet<T>(key: string): Promise<T | undefined> {
    return await this.cacheManager.get<T>(key);
  }

  private async rawSet<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (ttl && ttl > 0) {
      await this.cacheManager.set(key, value, ttl);
      return;
    }

    await this.cacheManager.set(key, value);
  }

  private formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
