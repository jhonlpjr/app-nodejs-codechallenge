import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ENVIRONMENTS } from 'src/shared/enums/environments.enum';
import { configuration } from 'src/shared/config/configuration-db';
import { TransactionResDTO } from '../dto/response/transaction.response.dto';
import { Transaction } from '../../domain/interfaces/transaction.interface';

@Injectable()
export class GetTransactionUseCase {
  private readonly logger = new Logger(GetTransactionUseCase.name);
  constructor(private readonly httpService: HttpService) {}

  async execute(transaction_id: string, key: string) {
    try {
      const msTransactionApi =
        configuration()[ENVIRONMENTS.VARIABLES.MS_TRANSACTION_API];

      const response = await firstValueFrom(
        this.httpService.get(
          `${msTransactionApi}/transactions/${transaction_id}`,
          {
            headers: {
              'Secret-Key': key,
            },
          },
        ),
      );
      if (response.status !== HttpStatus.OK) {
        this.logger.error('Error getting transaction', response.data);
        throw new BadRequestException(
          response.data?.message || 'Error getting transaction',
        );
      }
      const transactionData: Transaction = response.data as Transaction;
      return new TransactionResDTO(transactionData);
    } catch (error) {
      this.logger.error('Internal Server Error', error);
      throw new Error(error.response?.data?.message || 'Internal Server Error');
    }
  }
}
