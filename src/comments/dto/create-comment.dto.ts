import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        description: 'Yorumun başlığı',
        example: 'Yorum Başlığı',
    })
    @IsString({ message: 'başlık metin tipinde olmalı' })
    title: string;

    @ApiProperty({
        description: 'Yorumun içeriği',
        example: 'Yorum İçeriği',
    })
    @IsString({ message: 'içerik metin tipinde olmalı' })
    content: string;

    @ApiProperty({
        description: 'Yorumun post id',
        example: 1,
    })
    @IsNumber({}, { message: 'post id sayısal bir değer olmalı' })
    postId: number;
}
