import { ApiProperty } from "@nestjs/swagger";
import { CommentResponseOutput } from "../../comments/dto/resp.output";

export class UserDetailOutput {
  @ApiProperty({
    description: 'Kullanıcının ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Kullanıcının adı',
    example: 'Ahmet',
  })
  name: string;

  @ApiProperty({
    description: 'Kullanıcının e-posta adresi',
    example: 'Email Adresi',
  })
  email: string;

  @ApiProperty({
    description: 'Kullanıcının telefon numarası',
    example: '+90 555 111 11 11',
  })
  phone: string;

  @ApiProperty({
    description: 'Kullanıcının yorumları',
    type: [CommentResponseOutput],
  })
  comments: CommentResponseOutput[];
}
