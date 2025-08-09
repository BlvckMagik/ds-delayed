import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Group } from './entities/group.entity'
import { CreateGroupDto } from './dto/create-group.dto'

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupsRepository.create(createGroupDto)
    return this.groupsRepository.save(group)
  }

  async findAll(): Promise<Group[]> {
    return this.groupsRepository.find()
  }

  async findOne(id: string): Promise<Group> {
    return this.groupsRepository.findOne({ where: { id } })
  }
} 