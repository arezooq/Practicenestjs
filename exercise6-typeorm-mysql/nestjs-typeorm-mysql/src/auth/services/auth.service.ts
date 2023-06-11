import { Injectable } from '@nestjs/common';
import { AuthenticationProvider } from './auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { UserDetails } from 'src/utils/types';

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async validateUser(details: UserDetails) {
    const { discordId } = details;
    const user = await this.userRepo.findOne({ discordId });
    if (user) return user;
    const newUser = await this.createUser(details);
  }

  createUser(details: UserDetails) {
    const user = this.userRepo.create(details);
    return this.userRepo.save(user);
  }

  findUser(discordID: string): Promise<User | undefined> {
    return this.userRepo.findOne({ discordID });
  }
}
