import { Module } from '@nestjs/common';
import { TransactionResolver } from './api/resolvers/transaction.resolver';
import { TransactionMapper } from './api/mappers/transaction.mapper';
import { TransactionService } from './application/services/transaction.service';
import { TransactionProvider } from './infraestructure/providers/transaction.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [...TransactionProvider, TransactionService, TransactionResolver, TransactionMapper],
  exports: [...TransactionProvider, TransactionService],
})
export class TransactionModule {}
