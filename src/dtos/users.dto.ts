import { IsBoolean, IsString } from 'class-validator';
import { BaseUserDto } from '@dtos/base.dto';

export class CreateUserDto extends BaseUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;
}
