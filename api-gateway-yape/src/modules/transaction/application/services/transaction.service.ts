import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionUseCase } from '../usecases/create-transaction.usecase';
import { CreateTransactionReqDTO } from '../dto/request/create-transaction.request.dto';
import { GetTransactionUseCase } from '../usecases/get-transaction.usecase';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionUseCase: GetTransactionUseCase,
  ) {}

  async create(dto: CreateTransactionReqDTO, userId: number, key: string) {
    try {
      const response = await this.createTransactionUseCase.execute(
        dto,
        userId,
        key,
      );

      if (!response) {
        this.logger.error('Error al crear transacción');
        throw new BadRequestException('Error al crear transacción');
      }

      return response;
    } catch (error) {
      this.logger.error('Error al crear transaccion', error);
      throw error;
    }
  }

  async getTransaction(transaction_id: string, key: string) {
    try {
      const response = await this.getTransactionUseCase.execute(
        transaction_id,
        key,
      );

      return response;
    } catch (error) {
      this.logger.error('Error al obtener transacción', error);
      throw error;
    }
  }
}
