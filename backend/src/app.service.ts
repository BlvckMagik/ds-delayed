import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { HealthResponse, HealthStatus } from './types/health.types';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  getHello(): string {
    return 'DS Delayed API is running!';
  }

  async checkHealth(): Promise<HealthResponse> {
    const dbStatus = await this.checkDatabase();

    return {
      status: dbStatus.status === 'ok' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: dbStatus,
      },
    };
  }

  private async checkDatabase(): Promise<HealthStatus> {
    try {
      const isConnected = this.dataSource.isInitialized;
      if (!isConnected) {
        return {
          status: 'error',
          message: 'Database connection not initialized',
        };
      }

      await this.dataSource.query('SELECT 1');

      return {
        status: 'ok',
        message: 'Database connection healthy',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Database connection failed',
        error: error.message,
      };
    }
  }
}
