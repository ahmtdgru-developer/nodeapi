import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { VersionedCacheInterceptor } from '../common/cache/versioned-cache.interceptor';
import { CacheResource } from '../common/cache/cache.decorators';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  async create(
    @Body() createCommentInput: CreateCommentInput,
    @GetUser('id') userId: number,
  ) {
    return await this.commentsService.create(createCommentInput, userId);
  }

  @Public()
  @CacheResource({ namespace: 'comments', ttlEnvVar: 'COMMENTS_CACHE_TTL_MS' })
  @UseInterceptors(VersionedCacheInterceptor)
  @Get()
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Public()
  @CacheResource({ namespace: 'comments', ttlEnvVar: 'COMMENTS_CACHE_TTL_MS' })
  @UseInterceptors(VersionedCacheInterceptor)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.commentsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCommentInput: UpdateCommentInput) {
    return await this.commentsService.update(+id, updateCommentInput);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(+id);
  }
}
