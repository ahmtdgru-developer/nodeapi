import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {

  @ApiProperty({
    description: 'Kullanıcının adı',
    example: 'Ahmet',
  })
  @IsString({ message: 'isim metin tipinde olmalı' })
  @IsNotEmpty({ message: 'isim boş bırakılamaz' })
  name: string;

  @ApiProperty({
    description: 'Kullanıcının e-posta adresi',
    example: 'ahmet@example.com'
  })
  @IsEmail({}, { message: 'geçerli bir e-posta adresi girilmeli' })
  email: string;

  @ApiProperty({
    description: 'Kullanıcının telefon numarası',
    example: '+905551111111',
  })
  @IsPhoneNumber('TR', { message: 'geçerli bir telefon numarası girilmeli' })
  phone: string;

  @ApiProperty({
    description: 'Kullanıcının şifresi',
    example: 'password123',
    minLength: 6,
  })
  @IsString({ message: 'şifre metin tipinde olmalı' })
  @IsNotEmpty({ message: 'şifre boş bırakılamaz' })
  @MinLength(6, { message: 'şifre en az 6 karakter olmalı' })
  password: string;
}
