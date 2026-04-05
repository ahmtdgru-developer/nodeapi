import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

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
  @Get()
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Public()
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
