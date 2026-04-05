import { PartialType } from '@nestjs/swagger';
import { CreateUserInput } from './create.input';

export class UpdateUserInput extends PartialType(CreateUserInput) {
}
