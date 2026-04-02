import { ApiProperty } from "@nestjs/swagger";

export class RespCommentDto {
    @ApiProperty({
        description: 'Yorumun içeriği',
        example: 'Bu harika bir yazı!',
    })
    text: string;
}
