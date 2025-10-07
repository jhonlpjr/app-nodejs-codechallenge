import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateTransactionReqDTO {
  @IsUUID()
  @IsOptional()
  accountExternalIdDebit: string;
  @IsUUID()
  @IsOptional()
  accountExternalIdCredit: string;
  @IsNumber()
  tranferTypeId: number;
  @IsNumber()
  value: number;
}
