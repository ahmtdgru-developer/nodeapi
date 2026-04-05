import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CacheMetricsService } from '../common/cache/cache-metrics.service';
import { CacheService } from '../common/cache/cache.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly cacheService: CacheService,
    private readonly cacheMetricsService: CacheMetricsService,
  ) {}

  getLiveness() {
    return {
      status: 'ok',
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  async getReadiness() {
    const [database, redis] = await Promise.all([
      this.checkDatabase(),
      this.cacheService.checkConnection(),
    ]);

    return {
      status: database && redis ? 'ready' : 'degraded',
      checks: {
        database: database ? 'up' : 'down',
        redis: redis ? 'up' : 'down',
      },
      staleCacheStrategy: 'ttl-based-expiry',
      timestamp: new Date().toISOString(),
    };
  }

  getCacheMetrics() {
    return {
      status: 'ok',
      cache: this.cacheMetricsService.snapshot(),
      staleCacheStrategy: {
        mode: 'ttl-based-expiry',
        description:
          'Eski version keyleri TTL dolunca pasif olarak temizlenir; invalidation version bump ile yapılır.',
      },
      timestamp: new Date().toISOString(),
    };
  }

  private async checkDatabase(): Promise<boolean> {
    try {
      await this.dataSource.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }
}
