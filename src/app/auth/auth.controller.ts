import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/core/decorator/public.decorator';
import { Login } from './dto/login.dto';
import { CustomRequest } from '../../core/custom/custom-request.interface';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: CustomRequest): Promise<Login | BadRequestException> {
    return this.authService.login(req.user);
  }
}
