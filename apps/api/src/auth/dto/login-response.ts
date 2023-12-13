import { User } from 'src/users/entities/user.entity';

export class LoginResponse {
  access_token: string;

  user: User;
}
