import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'isim metin tipinde olmalı' })
  @IsNotEmpty({ message: 'isim boş bırakılamaz' })
  name: string;

  @IsEmail({}, { message: 'geçerli bir e-posta adresi girilmeli' })
  email: string;

  @IsPhoneNumber('TR', { message: 'geçerli bir telefon numarası girilmeli' })
  phone: string;
}
