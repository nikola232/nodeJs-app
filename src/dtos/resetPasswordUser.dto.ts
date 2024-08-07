import { IsString, IsEmail } from 'class-validator';

export class ResetPasswordUser {
  @IsString()
  public token: string;

  @IsEmail()
  public email: string;

  @IsString()
  public oldPassword: string;

  @IsString()
  public newPassword: string;
}
