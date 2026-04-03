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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiBearerAuth()
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

  @Public()
  @Get(':id/public')
  async findPublicProfile(@Param('id') id: string): Promise<UserPublicProfileDto> {
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toPublicProfile(user);
  }

  @Public() // Register
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
