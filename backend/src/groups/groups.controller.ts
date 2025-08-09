import { Controller, Get, Post, Body } from '@nestjs/common'
import { GroupsService } from './groups.service'
import { CreateGroupDto } from './dto/create-group.dto'
import { Group } from './entities/group.entity'

@Controller('api/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(createGroupDto)
  }

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupsService.findAll()
  }
} 