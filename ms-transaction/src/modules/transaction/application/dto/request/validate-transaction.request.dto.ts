import { Transaction } from '../../../domain/interfaces/transaction.interface';

export class ValidateTransactionReqDTO {
  transactionExternalId: string;

  accountExternalIdDebit: string;

  accountExternalIdCredit: string;

  value: number;

  constructor(transaction: Transaction) {
    this.transactionExternalId = transaction.transaction_id || null;
    this.accountExternalIdDebit = transaction.account_external_id_debit || null;
    this.accountExternalIdCredit =
      transaction.account_external_id_credit || null;
    this.value = transaction.value;
  }
}
