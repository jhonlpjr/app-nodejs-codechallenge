import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginReqDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'admin',
  })
  username: string;
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Contraseña',
    example: '12345678',
  })
  password: string;
}
