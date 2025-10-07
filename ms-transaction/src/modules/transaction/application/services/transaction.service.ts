import { Injectable, Logger } from '@nestjs/common';
import { CreateTransactionUseCase } from '../usecases/create-transaction.usecase';
import { CreateTransactionReqDTO } from '../dto/request/create-transaction.request.dto';
import { UpdateTransactionUseCase } from '../usecases/update-transaction.usecase';
import { GetTransactionUseCase } from '../usecases/get-transaction.usecase';
import { RpcException } from '@nestjs/microservices';
import { Transaction } from '../../domain/interfaces/transaction.interface';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
    private readonly getTransactionUseCase: GetTransactionUseCase,
  ) {}

  async create(
    dto: CreateTransactionReqDTO,
    userId: number,
    key: string,
  ): Promise<Transaction> {
    try {
      const createdTransaction = await this.createTransactionUseCase.execute(
        dto,
        userId,
        key,
      );

      return createdTransaction;
    } catch (error) {
      this.logger.error('Error in the transaction service', error);
      throw new RpcException(
        'Error in the transaction service: ' + error.message,
      );
    }
  }

  async update(transactionExternalId: string, isValid: boolean): Promise<Transaction> {
    try {
      const updatedTransaction = await this.updateTransactionUseCase.execute({
        transactionExternalId,
        isValid,
      });

      return updatedTransaction;
    } catch (error) {
      this.logger.error('Error in the transaction service', error);
      throw new Error('Error in the transaction service: ' + error.message);
    }
  }

  async get(transactionExternalId: string): Promise<Transaction> {
    try {
      const transaction = await this.getTransactionUseCase.execute(
        transactionExternalId,
      );

      return transaction;
    } catch (error) {
      this.logger.error('Error in the transaction service', error);
      throw new Error('Error in the transaction service: ' + error.message);
    }
  }
}
