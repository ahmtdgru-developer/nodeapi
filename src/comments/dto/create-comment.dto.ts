import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString({ message: 'başlık metin tipinde olmalı' })
    title: string;

    @IsString({ message: 'içerik metin tipinde olmalı' })
    content: string;

    @IsNumber({}, { message: 'post id sayısal bir değer olmalı' })
    postId: number;

    @IsNumber({}, { message: 'user id sayısal bir değer olmalı' })
    userId: number;
}
