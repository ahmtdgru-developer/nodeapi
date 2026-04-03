import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './entities/post.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor) // <-- Büyünün gerçekleştiği yer!
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    // SADECE Entity dönüyoruz. Mapper yazmak YOK!
    return await this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PostEntity> {
    return await this.postsService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.create(createPostDto);
  }
}
