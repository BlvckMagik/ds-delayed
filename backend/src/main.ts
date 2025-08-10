import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Завантажуємо змінні середовища
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Налаштування CORS для хостингу
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Глобальний префікс для API
  app.setGlobalPrefix('api');

  // Отримуємо порт з змінних середовища або використовуємо 3001
  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend запущено на порту ${port}`);
  console.log(`🌍 CORS origin: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
}
bootstrap();
