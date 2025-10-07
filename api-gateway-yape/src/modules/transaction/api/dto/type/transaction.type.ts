import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class TransactionType {
  @Field(() => String, { 
    description: 'Transaction type name' 
  })
  name: string;
}

@ObjectType()
export class TransactionStatus {
  @Field(() => String, { 
    description: 'Transaction status' 
  })
  name: string;
}

@ObjectType()
export class Transaction {
  @Field(() => String, { 
    description: 'External transaction ID' 
  })
  transactionExternalId: string;

  @Field(() => TransactionType, { 
    description: 'Transaction type' 
  })
  transactionType: TransactionType;

  @Field(() => TransactionStatus, { 
    description: 'Transaction status' 
  })
  transactionStatus: TransactionStatus;

  @Field(() => Float, { 
    description: 'Transaction value' 
  })
  value: number;

  @Field(() => Date, { 
    description: 'Creation date',
    nullable: true 
  })
  createdAt?: Date;
}