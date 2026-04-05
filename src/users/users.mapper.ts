import { UserDetailOutput } from './dto/detail.output';
import { UserListItemOutput } from './dto/list.output';
import { UserPublicProfileOutput } from './dto/public-profile.output';
import { User } from './entities/user.entity';
import { CommentResponseOutput } from '../comments/dto/resp.output';

export class UsersMapper {
  static toListItem(user: User): UserListItemOutput {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
  }

  static toList(users: User[]): UserListItemOutput[] {
    return users.map((user) => UsersMapper.toListItem(user));
  }

  static toDetail(user: User): UserDetailOutput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      comments: user.comments
        ? user.comments.map((comment) => {
          const commentOutput = new CommentResponseOutput();
          commentOutput.text = comment.content;
          return commentOutput;
        })
        : [],
    };
  }

  static toPublicProfile(user: User): UserPublicProfileOutput {
    return {
      name: user.name,
    };
  }
}
