import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { 
    description: 'Username' 
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @Field(() => String, { 
    description: 'User password' 
  })
  @IsString()
  @MinLength(6)
  password: string;
}