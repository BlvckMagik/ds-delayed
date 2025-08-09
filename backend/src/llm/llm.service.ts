import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly apiUrl =
    'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
  private readonly apiKey = process.env.HUGGING_FACE_API_KEY;

  async generateWish(): Promise<string> {
    try {
      if (!this.apiKey) {
        this.logger.warn(
          'HUGGING_FACE_API_KEY не налаштований, використовую стандартне побажання',
        );
        return this.getDefaultWish();
      }

      const prompt = `Generate a short motivational message in Ukrainian for a lesson. The message should be encouraging and end with an emoji. Keep it under 10 words.`;

      const response = await axios.post(
        this.apiUrl,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        },
      );

      if (
        response.data &&
        response.data[0] &&
        response.data[0].generated_text
      ) {
        const generatedText = response.data[0].generated_text;
        // Очищаємо текст від промпту та зайвих символів
        const cleanText = generatedText.replace(prompt, '').trim();
        return cleanText || this.getDefaultWish();
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
