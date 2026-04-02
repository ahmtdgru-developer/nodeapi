import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [];

  create(createCommentDto: CreateCommentDto) {

    const comment: Comment = {
      id: this.comments.length + 1,
      ...createCommentDto,
    };

    this.comments.push(comment);

    return comment;
  }

  findAll() {
    return this.comments;
  }

  findOne(id: number) {
    const comment = this.comments.find((comment) => comment.id === id);
    return comment;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = this.comments.find((comment) => comment.id === id);
    if (!comment) {
      return 'yorum bulunamadı';
    }

    Object.assign(comment, updateCommentDto);

    return comment;
  }

  remove(id: number) {
    const comment = this.comments.find((comment) => comment.id === id);
    if (!comment) {
      return 'yorum bulunamadı';
    }
    this.comments = this.comments.filter((comment) => comment.id !== id);
    return comment;
  }
}
