import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  readonly username: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
