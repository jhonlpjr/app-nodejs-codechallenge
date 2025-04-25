import { TRANSACTION_REPOSITORY } from 'src/shared/utils/constants/repositories.cst';
import { TransactionPostgresRepository } from '../database/repositories/transaction.postgres.repository';
import { CreateTransactionUseCase } from '../../application/usecases/create-transaction.usecase';
import { UpdateTransactionUseCase } from '../../application/usecases/update-transaction.usecase';
import { GetTransactionUseCase } from '../../application/usecases/get-transaction.usecase';

export const TransactionProvider = [
  {
    provide: TRANSACTION_REPOSITORY,
    useClass: TransactionPostgresRepository,
  },
  CreateTransactionUseCase,
  UpdateTransactionUseCase,
  GetTransactionUseCase,
];
