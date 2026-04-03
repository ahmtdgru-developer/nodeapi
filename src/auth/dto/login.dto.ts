import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Kullanıcının e-posta adresi',
    example: 'ahmet@example.com',
  })
  @IsEmail({}, { message: 'geçerli bir e-posta adresi girilmeli' })
  email: string;

  @ApiProperty({
    description: 'Kullanıcının şifresi',
    example: 'password123',
  })
  @IsString({ message: 'şifre metin tipinde olmalı' })
  @IsNotEmpty({ message: 'şifre boş bırakılamaz' })
  @MinLength(6, { message: 'şifre en az 6 karakter olmalı' })
  password: string;
}
