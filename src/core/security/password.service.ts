import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import 'dotenv/config';

@Injectable()
export class PasswordService {
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 14;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async checkPassword(
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
}
