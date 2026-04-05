import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/create.input';
import { UpdateUserInput } from './dto/update.input';
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

  async create(createUserInput: CreateUserInput) {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserInput.email } });
    if (existingUser) {
      throw new ConflictException('Bu e-posta adresi zaten kullanımda!');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const newUser = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(newUser);
    return savedUser; // Mapper controller bazında handle edilecek zaten
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    await this.findOne(id); // Önce kullanıcı var mı diye bakıyoruz (asenkron)
    return await this.userRepository.update(id, updateUserInput);
  }

  async remove(id: number) {
    const user = await this.findOne(id); // Önce kullanıcıyı buluyoruz (asenkron)
    await this.userRepository.delete(id);
    return user;
  }
}
