import { IsEmail, IsString } from 'class-validator';

export class BaseUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
