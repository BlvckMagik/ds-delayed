import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
const TelegramBot = require('node-telegram-bot-api')
import { format, formatInTimeZone } from 'date-fns-tz'
import { uk } from 'date-fns/locale'
import { Lesson } from '../lessons/entities/lesson.entity'
import { Group } from '../groups/entities/group.entity'

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name)
  private bot: any = null
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN

  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {
    if (!this.botToken) {
      this.logger.error('TELEGRAM_BOT_TOKEN не налаштований')
    } else {
      this.bot = new TelegramBot(this.botToken, { polling: false })
      this.logger.log('Telegram бот ініціалізовано')
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledLessons() {
    if (!this.bot) {
      this.logger.error('Бот не ініціалізовано')
      return
    }

    const now = new Date()
    const currentTime = format(now, 'HH:mm')
    const currentDayOfWeek = now.getDay()

    const lessons = await this.lessonsRepository.find({
      where: {
        dayOfWeek: currentDayOfWeek,
        time: currentTime,
      },
      relations: ['group'],
    })

    for (const lesson of lessons) {
      if (lesson.group) {
        await this.sendLessonReminder(lesson)
      }
    }
  }

  private async sendLessonReminder(lesson: Lesson) {
    if (!this.bot) return

    try {
      const message = this.createLessonMessage(lesson)
      
      // Надсилаємо повідомлення в чат групи
      await this.bot.sendMessage(lesson.group.chatId, message, { parse_mode: 'HTML' })
      this.logger.log(`Sent reminder for lesson: ${lesson.name} to chat: ${lesson.group.chatId}`)
    } catch (error) {
      this.logger.error(`Failed to send reminder for lesson: ${lesson.name}`, error)
    }
  }

  private createLessonMessage(lesson: Lesson): string {
    const now = new Date()
    const kievTime = formatInTimeZone(now, 'Europe/Kiev', 'HH:mm', { locale: uk })
    const berlinTime = formatInTimeZone(now, 'Europe/Berlin', 'HH:mm', { locale: uk })
    
    const dayNames = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
    const dayName = dayNames[lesson.dayOfWeek]
    
    return `
🔔 <b>Нагадування про заняття</b>

📚 <b>${lesson.name}</b>

📅 <b>День:</b> ${dayName}
⏰ <b>Час:</b> ${lesson.time}
🇺🇦 Київ: ${kievTime}
🇩🇪 Берлін: ${berlinTime}

🔗 <b>Посилання на Meet:</b> ${lesson.group.meetLink}

Приєднуйтесь до заняття!
    `.trim()
  }
} 