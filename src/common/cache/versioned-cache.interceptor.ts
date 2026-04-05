import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable, from, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CacheService } from './cache.service';
import {
  CACHE_DEFAULT_TTL_MS,
  CACHE_RESOURCE_METADATA,
  type CacheResourceConfig,
} from './cache.constants';

@Injectable()
export class VersionedCacheInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const config = this.reflector.getAllAndOverride<CacheResourceConfig>(
      CACHE_RESOURCE_METADATA,
      [context.getHandler(), context.getClass()],
    );

    if (!config || request.method !== 'GET') {
      return next.handle();
    }

    return from(this.buildCacheKey(config.namespace, request)).pipe(
      switchMap(async (cacheKey) => ({
        namespace: config.namespace,
        ttl: this.resolveTtl(config.ttlEnvVar),
        cacheKey,
        cachedResponse: await this.cacheService.get(config.namespace, cacheKey),
      })),
      switchMap(({ namespace, ttl, cacheKey, cachedResponse }) => {
        if (cachedResponse !== undefined) {
          return of(cachedResponse);
        }

        return next.handle().pipe(
          tap(async (response) => {
            await this.cacheService.set(namespace, cacheKey, response, ttl);
          }),
        );
      }),
    );
  }

  private async buildCacheKey(
    namespace: string,
    request: {
      baseUrl?: string;
      originalUrl?: string;
      path?: string;
    },
  ): Promise<string> {
    const version = await this.cacheService.getVersion(namespace);
    const route = request.originalUrl ?? request.baseUrl ?? request.path ?? '/';
    return `${namespace}:v${version}:${route}`;
  }

  private resolveTtl(ttlEnvVar?: string): number {
    const value = ttlEnvVar ? this.configService.get<string>(ttlEnvVar) : undefined;
    const ttl = Number(value);

    if (Number.isFinite(ttl) && ttl > 0) {
      return ttl;
    }

    return CACHE_DEFAULT_TTL_MS;
  }
}
