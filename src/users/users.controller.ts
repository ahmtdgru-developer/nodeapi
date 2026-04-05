import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create.input';
import { UserDetailOutput } from './dto/detail.output';
import { UserListItemOutput } from './dto/list.output';
import { UserPublicProfileOutput } from './dto/public-profile.output';
import { UpdateUserInput } from './dto/update.input';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { VersionedCacheInterceptor } from '../common/cache/versioned-cache.interceptor';
import { CacheResource } from '../common/cache/cache.decorators';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @CacheResource({ namespace: 'users', ttlEnvVar: 'USERS_CACHE_TTL_MS' })
  @UseInterceptors(VersionedCacheInterceptor)
  @Get()
  async findAll(): Promise<UserListItemOutput[]> {
    const users = await this.usersService.findAll();
    return UsersMapper.toList(users);
  }

  @CacheResource({ namespace: 'users', ttlEnvVar: 'USERS_CACHE_TTL_MS' })
  @UseInterceptors(VersionedCacheInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDetailOutput> {
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toDetail(user);
  }

  @Public()
  @CacheResource({ namespace: 'users', ttlEnvVar: 'USERS_CACHE_TTL_MS' })
  @UseInterceptors(VersionedCacheInterceptor)
  @Get(':id/public')
  async findPublicProfile(@Param('id') id: string): Promise<UserPublicProfileOutput> {
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toPublicProfile(user);
  }

  @Public() // Register
  @Post()
  async create(@Body() createUserInput: CreateUserInput): Promise<UserDetailOutput> {
    const user = await this.usersService.create(createUserInput);
    return UsersMapper.toDetail(user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserInput: UpdateUserInput,
  ): Promise<UserDetailOutput> {
    await this.usersService.update(Number(id), updateUserInput);
    const user = await this.usersService.findOne(Number(id));
    return UsersMapper.toDetail(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDetailOutput> {
    const user = await this.usersService.remove(Number(id));
    return UsersMapper.toDetail(user);
  }
}
