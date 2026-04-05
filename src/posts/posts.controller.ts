import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostInput } from './dto/create.input';
import { UpdatePostInput } from './dto/update.input';
import { Public } from '../auth/decorators/public.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiBearerAuth()
@ApiTags('posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor) // <-- Büyünün gerçekleştiği yer!
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Public()
  @Get()
  async findAll(): Promise<PostEntity[]> {
    // SADECE Entity dönüyoruz. Mapper yazmak YOK!
    return await this.postsService.findAll();
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return await this.postsService.findOne(Number(id));
  }

  @Post()
  async create(
    @Body() createPostInput: CreatePostInput,
    @GetUser('id') userId: number,
  ): Promise<PostEntity> {
    return await this.postsService.create(createPostInput, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostInput: UpdatePostInput,
  ) {
    return await this.postsService.update(Number(id), updatePostInput);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(Number(id));
  }
}
