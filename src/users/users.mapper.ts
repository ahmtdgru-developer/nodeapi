import { UserDetailDto } from './dto/user-detail.dto';
import { UserListItemDto } from './dto/user-list-item.dto';
import { UserPublicProfileDto } from './dto/user-public-profile.dto';
import { User } from './entities/user.entity';

export class UsersMapper {
  static toListItem(user: User): UserListItemDto {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
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
    };
  }

  static toPublicProfile(user: User): UserPublicProfileDto {
    return {
      name: user.name,
    };
  }
}
