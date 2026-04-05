import { PartialType } from '@nestjs/swagger';
import { CreatePostInput } from './create.input';

export class UpdatePostInput extends PartialType(CreatePostInput) { }
