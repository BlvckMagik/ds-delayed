export interface HealthStatus {
  status: 'ok' | 'error';
  message: string;
  error?: string;
}

export interface HealthResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  uptime: number;
  environment: string;
  version: string;
  services: {
    database: HealthStatus;
  };
}
