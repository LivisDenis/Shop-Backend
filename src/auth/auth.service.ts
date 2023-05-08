import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(userData: Prisma.UserCreateInput): Promise<{ token: string }> {
    const user = await this.validateUser(userData);
    return this.generateToken(user);
  }

  async registration(userData: Prisma.UserCreateInput): Promise<{ token: string }> {
    const candidate = await this.usersService.findOne({ email: userData.email });
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userData.password, 5);
    const user = await this.usersService.create({ ...userData, password: hashPassword });

    return this.generateToken(user);
  }

  private async validateUser(userData: Prisma.UserCreateInput): Promise<User> {
    const user = await this.usersService.findOne({ email: userData.email });
    const passwordEquals = await bcrypt.compare(userData.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' });
  }

  private async generateToken(userData: User): Promise<{ token: string }> {
    const payload = { id: userData.id, email: userData.email, name: userData.name };
    return {
      token: this.jwtService.sign(payload)
    };
  }
}
