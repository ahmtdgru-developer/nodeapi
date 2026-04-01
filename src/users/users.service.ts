import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Ahmet',
      email: 'ahmet@example.com',
      phone: '+90 555 111 11 11',
    },
    {
      id: 2,
      name: 'Ayse',
      email: 'ayse@example.com',
      phone: '+90 555 222 22 22',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number): User | null {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const deletedUser = this.users[index];
    this.users.splice(index, 1);
    return deletedUser;
  }
}
