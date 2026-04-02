import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı!');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Önce kullanıcı var mı diye bakıyoruz (asenkron)
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id); // Önce kullanıcıyı buluyoruz (asenkron)
    await this.userRepository.delete(id);
    return user;
  }
}
