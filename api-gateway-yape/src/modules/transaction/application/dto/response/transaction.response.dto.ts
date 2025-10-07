import { Transaction } from 'src/modules/transaction/domain/interfaces/transaction.interface';
import { TransactionCst } from 'src/shared/constants/transaction.cst';

export class TransactionResDTO {
  transactionExternalId: string;
  transactionType: {
    name: string;
  };
  transactionStatus: {
    name: string;
  };
  value: number;
  createdAt?: Date;

  constructor(transaction: Transaction) {
    this.transactionExternalId = transaction.transaction_id;
    this.transactionType = {
      name:
        TransactionCst.TransferTypeDesc[transaction.transfer_type_id] ||
        TransactionCst.TransferType.DEPOSIT,
    };
    this.transactionStatus = {
      name: transaction.status,
    };
    this.value = transaction.value;
    this.createdAt = transaction.created_at;
  }
}
