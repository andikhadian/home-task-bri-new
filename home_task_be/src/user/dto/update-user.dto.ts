import { IsNotEmpty, IsEmail, IsAlpha } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  nama: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsAlpha()
  pic: string;
}
