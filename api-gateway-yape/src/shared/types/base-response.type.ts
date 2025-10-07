import { ObjectType, Field, Int, createUnionType } from '@nestjs/graphql';
import { GRAPHQL_STATUS_CODES } from '../constants/status.constants';

@ObjectType()
export abstract class BaseResponse {
  @Field(() => Int, { 
    description: 'Código de estado de la respuesta',
    defaultValue: GRAPHQL_STATUS_CODES.DEFAULT_SUCCESS
  })
  code: number = GRAPHQL_STATUS_CODES.DEFAULT_SUCCESS;

  @Field(() => String, { 
    description: 'Mensaje de la respuesta',
    defaultValue: 'Operación exitosa'
  })
  message: string = 'Operación exitosa';
}

@ObjectType()
export class SuccessResponse extends BaseResponse {
  @Field(() => String, { 
    description: 'Datos de la respuesta',
    nullable: true 
  })
  data?: any;
}

@ObjectType()
export class ErrorResponse extends BaseResponse {
  @Field(() => String, { 
    description: 'Detalles del error',
    nullable: true 
  })
  error?: string;

  @Field(() => String, { 
    description: 'Traza del error',
    nullable: true 
  })
  trace?: string;
}