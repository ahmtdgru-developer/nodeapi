import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
    @Body() createPostDto: CreatePostDto,
    @GetUser('id') userId: number,
  ): Promise<PostEntity> {
    return await this.postsService.create(createPostDto, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postsService.update(Number(id), updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.postsService.remove(Number(id));
  }
}
