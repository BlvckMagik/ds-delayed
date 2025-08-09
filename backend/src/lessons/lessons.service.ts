import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from './entities/lesson.entity'
import { CreateLessonDto } from './dto/create-lesson.dto'

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonsRepository: Repository<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const lesson = this.lessonsRepository.create(createLessonDto)
    return this.lessonsRepository.save(lesson)
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonsRepository.find({
      relations: ['group'],
    })
  }

  async findOne(id: string): Promise<Lesson> {
    return this.lessonsRepository.findOne({
      where: { id },
      relations: ['group'],
    })
  }
} 