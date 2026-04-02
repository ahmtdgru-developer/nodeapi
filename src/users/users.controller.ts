import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDetailDto } from './dto/user-detail.dto';
import { UserListItemDto } from './dto/user-list-item.dto';
import { UserPublicProfileDto } from './dto/user-public-profile.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(): Promise<UserListItemDto[]> {
    const users = await this.usersService.findAll();
    return UsersMapper.toList(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDetailDto> {
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toDetail(user);
  }

  @Get(':id/public')
  async findPublicProfile(@Param('id') id: string): Promise<UserPublicProfileDto> {
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toPublicProfile(user);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDetailDto> {
    const user = await this.usersService.create(createUserDto);
    return UsersMapper.toDetail(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDetailDto> {
    console.log(updateUserDto);
    // Note: TypeORM update returns UpdateResult, not the entity. 
    // For simplicity, we fetch it again or service should return it.
    // Our service currently returns the result of .update() which is UpdateResult.
    // Let's fix service or handle it here.
    await this.usersService.update(Number(id), updateUserDto);
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toDetail(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDetailDto> {
    const user = await this.usersService.remove(Number(id));
    return UsersMapper.toDetail(user);
  }
}
