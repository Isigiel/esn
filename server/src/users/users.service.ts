import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeepPartial, Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getNew(): User {
    return this.usersRepository.create();
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneByLoginId(loginId: string): Promise<User> {
    return this.usersRepository.findOne(
      { loginId },
      { relations: ['memberships', 'memberships.section'] },
    );
  }

  search(query: string) {
    return this.usersRepository.find({
      where: [{ name: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
  }

  save(user: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
