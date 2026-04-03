import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePostDto {
    @IsString({ message: 'Başlık bir metin olmalıdır.' })
    @IsNotEmpty({ message: 'Başlık alanı zorunludur.' })
    title: string;

    @IsString({ message: 'İçerik bir metin olmalıdır.' })
    @IsNotEmpty({ message: 'İçerik alanı zorunludur.' })
    content: string;

    @IsNumber({}, { message: 'Kullanıcı ID bir sayı olmalıdır.' })
    @IsNotEmpty({ message: 'Kullanıcı ID alanı zorunludur.' })
    userId: number;

    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
}