import { IsAlpha, IsEmail, IsIn, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsAlpha()
  nama: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsIn(['1', '2'])
  role: string;

  @IsNotEmpty()
  @IsAlpha()
  pic: string;
}
