import { Transaction } from '../interfaces/transaction.interface';

export interface TransactionRepository {
  findById(id: string): Promise<Transaction>;
  findByTransactionId(transactionId: string): Promise<Transaction>;
  create(transaction: Partial<Transaction>): Promise<Transaction>;
  update(
    transactionId: string,
    transaction: Partial<Transaction>,
  ): Promise<Transaction>;
}
