import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../dto/create-user.input';
import { ForbiddenError } from 'apollo-server-express';

//validation
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const valid = await bcrypt.compare(password, user?.password);

    if (user && valid) {
      const { id, username } = user;
      return { id, username };
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.username, sub: user.id };
    return {
      username: user.username,
      id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
  async signup(createUserInput: CreateUserInput) {
    const user = await this.usersService.findOneByUsername(
      createUserInput.username,
    );

    if (user) {
      throw new NotAcceptableException('User already exists!');
    }
    const password = await bcrypt.hash(createUserInput.password, 10);

    const payload = await this.usersService.createUser({
      ...createUserInput,
      password,
    });
    const { username, id } = payload;

    const access_token = this.jwtService.sign({ id, username });
    return { access_token, username, id };
  }
}
