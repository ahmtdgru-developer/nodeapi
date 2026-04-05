import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../common/cache/cache.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly cacheService: CacheService,
  ) {}

  async create(createCommentInput: CreateCommentInput, userId: number) {
    const comment = this.commentRepository.create({
      ...createCommentInput,
      user: { id: userId } as any,
      post: { id: createCommentInput.postId } as any,
    });
    const savedComment = await this.commentRepository.save(comment);
    await this.cacheService.bumpVersions(['comments', 'posts', 'users']);
    return savedComment;
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Yorum bulunamadı!');
    }
    return comment;
  }

  async update(id: number, updateCommentInput: UpdateCommentInput) {
    await this.findOne(id);
    const result = await this.commentRepository.update(id, updateCommentInput);
    await this.cacheService.bumpVersions(['comments', 'posts', 'users']);
    return result;
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.commentRepository.delete(id);
    await this.cacheService.bumpVersions(['comments', 'posts', 'users']);
    return comment;
  }
}
