import { ApiProperty } from "@nestjs/swagger";

export class UserListItemOutput {
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
    description: 'Kullanıcının telefon numarası',
    example: '+90 555 111 11 11',
  })
  phone: string;

  @ApiProperty({
    description: 'Kullanıcının e-posta adresi',
    example: 'Email Adresi',
  })
  email: string;
}
