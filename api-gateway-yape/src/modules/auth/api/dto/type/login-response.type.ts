import { ObjectType, Field } from '@nestjs/graphql';
import { BaseResponse } from 'src/shared/types/base-response.type';
import { LoginType } from './login.type';

@ObjectType()
export class LoginResponse extends BaseResponse {
  @Field(() => LoginType, { 
    description: 'Datos de la respuesta de login' 
  })
  data: LoginType;
}