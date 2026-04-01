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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): UserListItemDto[] {
    return UsersMapper.toList(this.usersService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserDetailDto | null {
    const user = this.usersService.findOne(Number(id));

    if (!user) {
      return null;
    }

    return UsersMapper.toDetail(user);
  }

  @Get(':id/public')
  findPublicProfile(@Param('id') id: string): UserPublicProfileDto | null {
    const user = this.usersService.findOne(Number(id));

    if (!user) {
      return null;
    }

    return UsersMapper.toPublicProfile(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserDetailDto {
    const user = this.usersService.create(createUserDto);
    return UsersMapper.toDetail(user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): UserDetailDto | null {
    const user = this.usersService.update(Number(id), updateUserDto);

    if (!user) {
      return null;
    }

    return UsersMapper.toDetail(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): UserDetailDto | null {
    const user = this.usersService.remove(Number(id));

    if (!user) {
      return null;
    }

    return UsersMapper.toDetail(user);
  }
}
