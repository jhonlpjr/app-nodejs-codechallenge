import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from '../../application/services/transaction.service';
import { CreateTransactionReqDTO } from '../../application/dto/request/create-transaction.request.dto';
import { Controller, Logger } from '@nestjs/common';
import { validateSecretKey } from 'src/shared/utils/functions/auth';

@Controller('transactions-tcp')
export class TransactionTcpController {
  private readonly logger = new Logger(TransactionTcpController.name);
  constructor(private readonly transactionService: TransactionService) {}

  @MessagePattern({ cmd: 'create-transaction' })
  async createTransaction(
    @Payload()
    payload: {
      dto: CreateTransactionReqDTO;
      userId: number;
      key: string;
    },
  ) {
    const isValid = await validateSecretKey(payload.key);
    if (!isValid) {
      this.logger.error('Invalid secret key');
      return { status: 'failed', error: 'Invalid secret key' };
    }

    try {
      const createdTransaction = await this.transactionService.create(
        payload.dto,
        payload.userId,
        payload.key,
      );

      const response = { status: 'success', data: createdTransaction };

      this.logger.log('Transaction created successfully', response);

      return response;
    } catch (error) {
      this.logger.error('Error creating transaction', error);
      return { status: 'failed', error: error.message };
    }
  }
}
