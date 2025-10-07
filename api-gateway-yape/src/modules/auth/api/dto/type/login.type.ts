import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field(() => String, { 
    description: 'Token de autenticación JWT' 
  })
  token: string;
}