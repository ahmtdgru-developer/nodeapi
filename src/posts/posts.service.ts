import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: PostEntity[] = [
    new PostEntity({
      id: 1,
      title: 'İlk Gönderimiz',
      content: 'Bu örnek bir gönderi içeriğidir, class-transformer ile test ediyoruz.',
      authorId: 99, // Gizli
      isDeleted: false,
    }),
    new PostEntity({
      id: 2,
      title: 'Harika bir Mimari',
      content: 'Bugün NestJS ClassSerializerInterceptor öğreniyorum!',
      authorId: 101, // Gizli
      isDeleted: false,
    }),
  ];

  findAll(): PostEntity[] {
    return this.posts.filter((post) => !post.isDeleted);
  }

  findOne(id: number): PostEntity {
    const post = this.posts.find((p) => p.id === id && !p.isDeleted);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }
}
