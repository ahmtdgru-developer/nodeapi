import { Global, Module } from '@nestjs/common';
import { CacheMetricsService } from './cache-metrics.service';
import { CacheService } from './cache.service';
import { VersionedCacheInterceptor } from './versioned-cache.interceptor';

@Global()
@Module({
  providers: [CacheMetricsService, CacheService, VersionedCacheInterceptor],
  exports: [CacheMetricsService, CacheService, VersionedCacheInterceptor],
})
export class AppCacheModule {}
