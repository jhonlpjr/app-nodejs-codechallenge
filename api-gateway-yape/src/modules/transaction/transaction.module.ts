import { Module } from '@nestjs/common';
import { TransactionController } from './infraestructure/controllers/transaction.controller';
import { TransactionService } from './application/services/transaction.service';
import { TransactionProvider } from './infraestructure/providers/transaction.provider';

@Module({
  imports: [],
  controllers: [TransactionController],
  providers: [...TransactionProvider, TransactionService],
  exports: [...TransactionProvider, TransactionService],
})
export class TransactionModule {}
