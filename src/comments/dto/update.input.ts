import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateCommentInput } from './create.input';

export class UpdateCommentInput extends PartialType(
    OmitType(CreateCommentInput, ['postId'] as const),
) { }
