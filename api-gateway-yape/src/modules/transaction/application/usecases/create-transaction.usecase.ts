import {
  BadRequestException,
  Inject,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateTransactionReqDTO } from '../dto/request/create-transaction.request.dto';
import { ClientProxy } from '@nestjs/microservices';
import {
  TCP_RESPONSE_STATUS,
  TRANSACTION_MICROSERVICE_TCP,
} from 'src/shared/constants/microservices.cst';
import { CreateTransactionMsgResDTO } from '../dto/response/create-transaction-msg.res.dto';
import { isString } from 'class-validator';
import { TransactionResDTO } from '../dto/response/transaction.response.dto';
import { Transaction } from '../../domain/interfaces/transaction.interface';

export class CreateTransactionUseCase {
  private readonly logger = new Logger(CreateTransactionUseCase.name);
  constructor(
    @Inject(TRANSACTION_MICROSERVICE_TCP)
    private readonly transactionClient: ClientProxy,
  ) {}

  async execute(dto: CreateTransactionReqDTO, userId: number, key: string) {
    try {
      const payload = { dto, userId, key };

      const response: CreateTransactionMsgResDTO = await firstValueFrom(
        this.transactionClient.send({ cmd: 'create-transaction' }, payload),
      );
      if (response.status === TCP_RESPONSE_STATUS.failed) {
        this.logger.error('Error creating transaction', response.error);
        if (isString(response.error) && response.error.includes('Invalid')) {
          throw new UnauthorizedException(response.error);
        }
        throw new BadRequestException(
          isString(response.error)
            ? response.error
            : response.error['message'] || 'Error creating transaction',
        );
      }
      const transactionData: Transaction = response.data as Transaction;
      return new TransactionResDTO(transactionData);
    } catch (error) {
      this.logger.error('Error creating transaction', error);
      throw error;
    }
  }
}
