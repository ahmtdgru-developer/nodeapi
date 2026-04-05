import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get('live')
  getLiveness() {
    return this.healthService.getLiveness();
  }

  @Public()
  @Get('ready')
  async getReadiness() {
    return await this.healthService.getReadiness();
  }

  @Public()
  @Get('metrics')
  getCacheMetrics() {
    return this.healthService.getCacheMetrics();
  }
}
