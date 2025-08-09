import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  meetLink: string;

  @Column()
  chatId: string;

  @OneToMany(() => Lesson, (lesson) => lesson.group)
  lessons: Lesson[];
}
