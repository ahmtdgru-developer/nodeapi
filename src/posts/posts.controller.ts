import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostEntity } from './entities/post.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor) // <-- Büyünün gerçekleştiği yer!
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  findAll(): PostEntity[] {
    // SADECE Entity dönüyoruz. Mapper yazmak YOK!
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PostEntity {
    return this.postsService.findOne(Number(id));
  }
}
