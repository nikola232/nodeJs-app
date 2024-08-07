import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public title: string;
  @IsString()
  public author: string;
  @IsNumber()
  public isbn?: number;
}
