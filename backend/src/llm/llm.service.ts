import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly apiUrl = 'https://api.openai.com/v1/chat/completions';
  private readonly apiKey = process.env.OPENAI_API_KEY;

  async generateWish(): Promise<string> {
    try {
      if (!this.apiKey) {
        this.logger.warn(
          'OPENAI_API_KEY не налаштований, використовую стандартне побажання',
        );
        return this.getDefaultWish();
      }

      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'Ти допомагаєш генерувати короткі мотиваційні побажання українською мовою для занять. Побажання мають бути позитивними, короткими (до 10 слів) та закінчуватися емодзі.',
            },
            {
              role: 'user',
              content:
                'Згенеруй коротке мотиваційне побажання українською мовою для заняття. Побажання має бути позитивним та закінчуватися емодзі.',
            },
          ],
          max_tokens: 50,
          temperature: 0.8,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        },
      );

      if (
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content
      ) {
        const generatedText = response.data.choices[0].message.content.trim();
        return generatedText || this.getDefaultWish();
      }

      return this.getDefaultWish();
    } catch (error) {
      this.logger.error('Помилка генерації побажання:', error.message);
      return this.getDefaultWish();
    }
  }

  private getDefaultWish(): string {
    const defaultWishes = [
      'Бажаю продуктивного заняття! 🚀',
      'Нехай це заняття буде корисним! 💪',
      'Готовий до нових знань! 📚',
      'Успіхів у навчанні! ⭐',
      'Приємного заняття! 🌟',
      'Бажаю цікавого уроку! 🎯',
      'Нехай все вийде чудово! ✨',
      'Готовий до роботи! 🔥',
    ];

    return defaultWishes[Math.floor(Math.random() * defaultWishes.length)];
  }
}
