import { UserDetailDto } from './dto/user-detail.dto';
import { UserListItemDto } from './dto/user-list-item.dto';
import { UserPublicProfileDto } from './dto/user-public-profile.dto';
import { User } from './entities/user.entity';
import { RespCommentDto } from '../comments/dto/resp-comment.dto';

export class UsersMapper {
  static toListItem(user: User): UserListItemDto {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };
  }

  static toList(users: User[]): UserListItemDto[] {
    return users.map((user) => UsersMapper.toListItem(user));
  }

  static toDetail(user: User): UserDetailDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      comments: user.comments
        ? user.comments.map((comment) => {
          const commentDto = new RespCommentDto();
          commentDto.text = comment.content;
          return commentDto;
        })
        : [],
    };
  }

  static toPublicProfile(user: User): UserPublicProfileDto {
    return {
      name: user.name,
    };
  }
}
