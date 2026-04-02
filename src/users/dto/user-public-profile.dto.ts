import { ApiProperty } from "@nestjs/swagger";

export class UserPublicProfileDto {
  @ApiProperty({
    description: 'Kullanıcının adı',
    example: 'Ahmet',
  })
  name: string;
}
