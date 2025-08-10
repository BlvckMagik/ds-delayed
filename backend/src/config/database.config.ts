import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // Конфігурація для продакшну (Render)
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL, // Render надає це
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false, // В продакшні вимикаємо auto-sync
      ssl: {
        rejectUnauthorized: false, // Необхідно для Render
      },
    };
  }
  
  // Конфігурація для розробки
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'ds_delayed_user',
    password: process.env.DB_PASSWORD || 'your_password_here',
    database: process.env.DB_DATABASE || 'ds_delayed_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // В розробці дозволяємо auto-sync
  };
}; 