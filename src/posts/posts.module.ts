import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsCacheService } from './posts-cache.service';
import { PostsCacheInterceptor } from './interceptors/posts-cache.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, PostsCacheService, PostsCacheInterceptor],
})
export class PostsModule { }
