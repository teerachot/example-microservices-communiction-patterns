import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor() {
    for (let i = 1; i <= 10; i++) {
      this.users.push({
        id: i,
        name: `name-${i}`,
        email: `email-${i}@my-comp.com`,
        address: `address-${i}`,
        tel: `081-${i}xx-xxxx`,
      });
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }
}
