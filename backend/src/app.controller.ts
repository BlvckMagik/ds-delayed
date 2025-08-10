import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthResponse } from './types/health.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(): Promise<HealthResponse> {
    return this.appService.checkHealth();
  }
}
