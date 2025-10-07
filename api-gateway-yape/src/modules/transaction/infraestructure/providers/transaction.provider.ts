import { CreateTransactionUseCase } from '../../application/usecases/create-transaction.usecase';
import { GetTransactionUseCase } from '../../application/usecases/get-transaction.usecase';

export const TransactionProvider = [
  CreateTransactionUseCase,
  GetTransactionUseCase,
];
