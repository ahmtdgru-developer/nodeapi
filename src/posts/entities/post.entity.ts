import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Exclude, Expose } from "class-transformer";

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @Expose()
  get summary(): string {
    return this.content ? this.content.substring(0, 15) + '...' : '';
  }
}
