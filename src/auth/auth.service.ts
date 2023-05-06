import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.email, sub: user.name };

    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.SECRET_KEY })
    };
  }
}
