import { ObjectType, Field } from '@nestjs/graphql';
import { BaseResponse } from 'src/shared/types/base-response.type';
import { Transaction } from './transaction.type';

@ObjectType()
export class CreateTransactionResponse extends BaseResponse {
  @Field(() => Transaction, { 
    description: 'Created transaction data' 
  })
  data: Transaction;
}

@ObjectType()
export class GetTransactionResponse extends BaseResponse {
  @Field(() => Transaction, { 
    description: 'Retrieved transaction data' 
  })
  data: Transaction;
}