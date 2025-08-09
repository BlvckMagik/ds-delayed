import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupsModule } from './groups/groups.module';
import { LessonsModule } from './lessons/lessons.module';
import { TelegramModule } from './telegram/telegram.module';
import { LlmModule } from './llm/llm.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ds_delayed',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    GroupsModule,
    LessonsModule,
    TelegramModule,
    LlmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
