import { ApiProperty } from "@nestjs/swagger";

export class UserListItemDto {
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
}
