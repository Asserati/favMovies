import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserInput {
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
