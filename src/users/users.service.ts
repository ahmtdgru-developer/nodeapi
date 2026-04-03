import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'], // password'ü burada açıkça seçiyoruz
    });
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
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('Bu e-posta adresi zaten kullanımda!');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    return savedUser; // Mapper controller bazında handle edilecek zaten
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
