import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    description: 'Kullanıcının adı',
    example: 'Ahmet',
  })

  @IsString({ message: 'isim metin tipinde olmalı' })
  @IsNotEmpty({ message: 'isim boş bırakılamaz' })
  name: string;

  @ApiProperty({
    description: 'Kullanıcının e-posta adresi',
    example: 'Email Adresi'
  })

  @IsEmail({}, { message: 'geçerli bir e-posta adresi girilmeli' })
  email: string;

  @ApiProperty({
    description: 'Kullanıcının telefon numarası',
    example: '+90 555 111 11 11',
  })
  @IsPhoneNumber('TR', { message: 'geçerli bir telefon numarası girilmeli' })
  phone: string;
}
