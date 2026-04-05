import { ApiProperty } from "@nestjs/swagger";

export class UserPublicProfileOutput {
  @ApiProperty({
    description: 'Kullanıcının adı',
    example: 'Ahmet',
  })
  name: string;
}
