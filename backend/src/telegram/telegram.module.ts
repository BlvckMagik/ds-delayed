import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramService } from './telegram.service';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Group } from '../groups/entities/group.entity';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Group]), LlmModule],
  providers: [TelegramService],
})
export class TelegramModule {}
