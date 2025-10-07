import { Inject, Logger } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { TRANSACTION_REPOSITORY } from 'src/shared/utils/constants/repositories.cst';
import { Transaction } from '../../domain/interfaces/transaction.interface';

export class GetTransactionUseCase {
  private readonly logger = new Logger(GetTransactionUseCase.name);
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(transactionExternalId: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionRepository.findByTransactionId(
        transactionExternalId,
      );

      return transaction;
    } catch (error) {
      this.logger.error(
        `Error updating transaction: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  }
}
