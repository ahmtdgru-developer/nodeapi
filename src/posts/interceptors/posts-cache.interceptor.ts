import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Cache } from 'cache-manager';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PostsCacheService } from '../posts-cache.service';

@Injectable()
export class PostsCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly postsCacheService: PostsCacheService,
    private readonly configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();

    if (request.method !== 'GET') {
      return next.handle();
    }

    return from(this.buildCacheKey(request)).pipe(
      switchMap(async (cacheKey) => ({
        cacheKey,
        cachedResponse: await this.cacheManager.get(cacheKey),
      })),
      switchMap(({ cacheKey, cachedResponse }) => {
        if (cachedResponse !== undefined && cachedResponse !== null) {
          return of(cachedResponse);
        }

        return next.handle().pipe(
          tap(async (response) => {
            await this.cacheManager.set(
              cacheKey,
              response,
              this.getTtlMilliseconds(),
            );
          }),
        );
      }),
    );
  }

  private async buildCacheKey(request: {
    baseUrl?: string;
    originalUrl?: string;
    path?: string;
    query?: Record<string, string>;
  }): Promise<string> {
    const version = await this.postsCacheService.getVersion();
    const route = request.originalUrl ?? request.baseUrl ?? request.path ?? '/posts';

    return `posts:v${version}:${route}`;
  }

  private getTtlMilliseconds(): number {
    const configuredTtl = this.configService.get<string>('POSTS_CACHE_TTL_MS');
    const ttl = Number(configuredTtl);

    if (Number.isFinite(ttl) && ttl > 0) {
      return ttl;
    }

    return 60_000;
  }
}
