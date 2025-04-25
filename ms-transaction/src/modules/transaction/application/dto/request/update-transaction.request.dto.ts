import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateTransactionReqDTO {
  @IsUUID()
  transactionExternalId: string;
  @IsBoolean()
  isValid: boolean;

  constructor(transaction: UpdateTransactionReqDTO) {
    this.transactionExternalId = transaction.transactionExternalId || null;
    this.isValid = transaction.isValid;
  }
}
