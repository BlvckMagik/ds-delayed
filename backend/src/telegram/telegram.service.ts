import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, LessThanOrEqual } from 'typeorm'
import TelegramBot from 'node-telegram-bot-api'
import { format, formatInTimeZone } from 'date-fns-tz'
import { uk } from 'date-fns/locale'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Group } from '../groups/entities/group.entity'

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name)
  private bots: Map<string, TelegramBot> = new Map()

  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledLessons() {
    const now = new Date()
    const lessons = await this.lessonsRepository.find({
      where: {
        time: LessThanOrEqual(now.toISOString()),
      },
      relations: ['group'],
    })

    for (const lesson of lessons) {
      if (lesson.group) {
        await this.sendLessonReminder(lesson)
        await this.lessonsRepository.remove(lesson)
      }
    }
  }

  private async sendLessonReminder(lesson: Lesson) {
    try {
      const bot = this.getBot(lesson.group.token)
      const message = this.createLessonMessage(lesson)
      
      await bot.sendMessage(lesson.groupId, message, { parse_mode: 'HTML' })
      this.logger.log(`Sent reminder for lesson: ${lesson.name}`)
    } catch (error) {
      this.logger.error(`Failed to send reminder for lesson: ${lesson.name}`, error)
    }
  }

  private getBot(token: string): TelegramBot {
    if (!this.bots.has(token)) {
      const bot = new TelegramBot(token, { polling: false })
      this.bots.set(token, bot)
    }
    return this.bots.get(token)!
  }

  private createLessonMessage(lesson: Lesson): string {
    const lessonTime = new Date(lesson.time)
    const kievTime = formatInTimeZone(lessonTime, 'Europe/Kiev', 'PPp', { locale: uk })
    const berlinTime = formatInTimeZone(lessonTime, 'Europe/Berlin', 'PPp', { locale: uk })
    
    return `
🔔 <b>Нагадування про заняття</b>

📚 <b>${lesson.name}</b>

⏰ <b>Час:</b>
🇺🇦 Київ: ${kievTime}
🇩🇪 Берлін: ${berlinTime}

🔗 <b>Посилання на Meet:</b> ${lesson.group.meetLink}

Приєднуйтесь до заняття!
    `.trim()
  }
} 