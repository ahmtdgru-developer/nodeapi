import { IsEmail, IsOptional, IsString, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'isim metin tipinde olmalı' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'geçerli bir e-posta adresi girilmeli' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('TR', { message: 'geçerli bir telefon numarası girilmeli' })
  phone?: string;
}
