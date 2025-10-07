import { Transaction } from '../interfaces/transaction.interface';

export class TransactionEntity implements Transaction {
  id: number;
  account_external_id_credit: string;
  account_external_id_debit: string;
  created_at: Date;
  registered_by: number;
  transaction_id: string;
  status: string;
  transfer_type_id: number;
  updated_at: Date;
  value: number;

  constructor(partial: Partial<Transaction>) {
    this.id = partial.id || 0;
    this.account_external_id_credit = partial.account_external_id_credit || '';
    this.account_external_id_debit = partial.account_external_id_debit || '';
    this.created_at = partial.created_at || new Date();
    this.registered_by = partial.registered_by || 0;
    this.transaction_id = partial.transaction_id || '';
    this.status = partial.status || 'pending';
    this.transfer_type_id = partial.transfer_type_id || 0;
    this.updated_at = partial.updated_at || new Date();
    this.value = partial.value || 0;
  }
}
