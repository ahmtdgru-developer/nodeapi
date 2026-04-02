import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(
    OmitType(CreateCommentDto, ['userId', 'postId'] as const),
) { }
