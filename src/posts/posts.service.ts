import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create.input';
import { UpdatePostInput } from './dto/update.input';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  findAll() {
    return this.postRepository.find({
      where: { isDeleted: false },
      relations: ['user', 'comments'],
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['user', 'comments'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async create(createPostInput: CreatePostInput, userId: number): Promise<Post> {
    await this.cacheManager.del('/posts'); // Liste cache'ini boz
    const post = this.postRepository.create({
      ...createPostInput,
      user: { id: userId } as any, // User entity'sine ID ile bağladık
    });
    return await this.postRepository.save(post);
  }

  async update(id: number, updatePostInput: UpdatePostInput) {
    await this.cacheManager.del('/posts');
    await this.cacheManager.del(`/posts/${id}`); // Tekil cache'i de boz
    await this.findOne(id);
    return await this.postRepository.update(id, updatePostInput);
  }

  async remove(id: number) {
    await this.cacheManager.del('/posts');
    await this.cacheManager.del(`/posts/${id}`);
    const post = await this.findOne(id);
    post.isDeleted = true;
    return await this.postRepository.save(post);
  }
}
