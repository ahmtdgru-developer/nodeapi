import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user: { id: userId } as any,
      post: { id: createCommentDto.postId } as any,
    });
    return await this.commentRepository.save(comment);
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

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    await this.findOne(id);
    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.commentRepository.delete(id);
    return comment;
  }
}
