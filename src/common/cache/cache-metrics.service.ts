import { Injectable } from '@nestjs/common';

type CacheMetricName =
  | 'hit'
  | 'miss'
  | 'write'
  | 'error'
  | 'invalidate';

type CacheMetricSnapshot = Record<CacheMetricName, number>;

@Injectable()
export class CacheMetricsService {
  private readonly metrics = new Map<string, CacheMetricSnapshot>();

  record(namespace: string, metric: CacheMetricName): void {
    const current = this.metrics.get(namespace) ?? this.createEmptySnapshot();
    current[metric] += 1;
    this.metrics.set(namespace, current);
  }

  snapshot() {
    const namespaces = Array.from(this.metrics.entries()).reduce<
      Record<string, CacheMetricSnapshot & { hitRatio: number }>
    >((accumulator, [namespace, metrics]) => {
      const totalReads = metrics.hit + metrics.miss;
      accumulator[namespace] = {
        ...metrics,
        hitRatio: totalReads === 0 ? 0 : metrics.hit / totalReads,
      };
      return accumulator;
    }, {});

    return {
      namespaces,
      totals: Array.from(this.metrics.values()).reduce(
        (accumulator, metrics) => ({
          hit: accumulator.hit + metrics.hit,
          miss: accumulator.miss + metrics.miss,
          write: accumulator.write + metrics.write,
          error: accumulator.error + metrics.error,
          invalidate: accumulator.invalidate + metrics.invalidate,
        }),
        this.createEmptySnapshot(),
      ),
    };
  }

  private createEmptySnapshot(): CacheMetricSnapshot {
    return {
      hit: 0,
      miss: 0,
      write: 0,
      error: 0,
      invalidate: 0,
    };
  }
}
