import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
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

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const post = this.postRepository.create({
      ...createPostDto,
      user: { id: userId } as any, // User entity'sine ID ile bağladık
    });
    return await this.postRepository.save(post);
  }

  async update(id: number, updatePostDto: any) {
    await this.findOne(id);
    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    post.isDeleted = true;
    return await this.postRepository.save(post);
  }
}
