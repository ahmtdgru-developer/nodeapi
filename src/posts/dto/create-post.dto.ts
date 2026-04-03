import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @IsString({ message: 'Başlık bir metin olmalıdır.' })
    @IsNotEmpty({ message: 'Başlık alanı zorunludur.' })
    title: string;

    @ApiProperty({ description: 'İçerik' })
    @IsString({ message: 'İçerik bir metin olmalıdır.' })
    @IsNotEmpty({ message: 'İçerik alanı zorunludur.' })
    content: string;

    @ApiProperty({ description: 'Silinme durumu', required: false })
    @IsBoolean()
    @IsOptional()
    isDeleted: boolean;
}