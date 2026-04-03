import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Post } from "../../posts/entities/post.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    postId: number;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;
    
    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
}
