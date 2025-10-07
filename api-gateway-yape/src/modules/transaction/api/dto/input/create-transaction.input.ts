import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateTransactionInput {
  @Field(() => String, { 
    description: 'Debit account ID'
  })
  @IsUUID('4', { message: 'accountExternalIdDebit must be a valid UUID (e.g., 550e8400-e29b-41d4-a716-446655440001)' })
  @IsOptional()
  accountExternalIdDebit: string;

  @Field(() => String, { 
    description: 'Credit account ID'
  })
  @IsUUID('4', { message: 'accountExternalIdCredit must be a valid UUID (e.g., 550e8400-e29b-41d4-a716-446655440002)' })
  @IsOptional()
  accountExternalIdCredit: string;

  @Field(() => Int, { 
    description: 'Transfer type ID' 
  })
  @IsNumber({}, { message: 'transferTypeId must be a valid number' })
  @Min(1, { message: 'transferTypeId must be greater than 0' })
  transferTypeId: number;

  @Field(() => Float, { 
    description: 'Transaction amount' 
  })
  @IsNumber({}, { message: 'amount must be a valid number' })
  @Min(0.01, { message: 'amount must be greater than 0.01' })
  amount: number;
}