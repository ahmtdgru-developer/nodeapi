import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'Ahmet', email: 'ahmet@example.com' },
    { id: 2, name: 'Ayse', email: 'ayse@example.com' },
  ];

  findAll() {
    return this.users;
  }
}
