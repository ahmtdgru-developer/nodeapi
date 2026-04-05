import { ApiProperty } from "@nestjs/swagger";

export class CommentResponseOutput {
    @ApiProperty({
        description: 'Yorumun içeriği',
        example: 'Bu harika bir yazı!',
    })
    text: string;
}
