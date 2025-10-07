import { Inject, Logger } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { TRANSACTION_REPOSITORY } from 'src/shared/utils/constants/repositories.cst';
import { Transaction } from '../../domain/interfaces/transaction.interface';

import { UpdateTransactionReqDTO } from '../dto/request/update-transaction.request.dto';
import { TransactionEnum } from '../../domain/enums/transaction.enum';

export class UpdateTransactionUseCase {
  private readonly logger = new Logger(UpdateTransactionUseCase.name);
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute({
    isValid,
    transactionExternalId,
  }: UpdateTransactionReqDTO): Promise<Transaction> {
    try {
      const transaction = await this.transactionRepository.update(
        transactionExternalId,
        {
          status: isValid
            ? TransactionEnum.TransactionStatus.APPROVED
            : TransactionEnum.TransactionStatus.REJECTED,
        },
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
