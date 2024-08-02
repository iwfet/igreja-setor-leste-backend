import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 20;
    return await bcrypt.hash(password, saltRounds);
  }

  async checkPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
