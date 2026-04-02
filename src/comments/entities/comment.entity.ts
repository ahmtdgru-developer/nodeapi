import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    postId: number;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;
    
    @Column()
    userId: number;
}
