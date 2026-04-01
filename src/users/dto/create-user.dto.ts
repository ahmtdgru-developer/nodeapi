import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'isim metin tipinde olmalı' })
  @IsNotEmpty({ message: 'isim boş bırakılamaz' })
  name: string;

  @IsEmail({}, { message: 'geçerli bir e-posta adresi girilmeli' })
  email: string;

  @IsString({ message: 'telefon metin tipinde olmalı' })
  @IsNotEmpty({ message: 'telefon boş bırakılamaz' })
  phone: string;
}
