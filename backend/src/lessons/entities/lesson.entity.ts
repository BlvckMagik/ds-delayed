import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from '../../groups/entities/group.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dayOfWeek: number;

  @Column()
  time: string;

  @Column()
  groupId: string;

  @ManyToOne(() => Group, (group) => group.lessons)
  @JoinColumn({ name: 'groupId' })
  group: Group;
}
