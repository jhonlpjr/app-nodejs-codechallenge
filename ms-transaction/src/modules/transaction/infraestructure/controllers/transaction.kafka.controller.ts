import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from '../../application/services/transaction.service';
import { Controller, Logger } from '@nestjs/common';
import { validateSecretKey } from 'src/shared/utils/functions/auth';

@Controller('transactions-kafka')
export class TransactionKafkaController {
  private readonly logger = new Logger(TransactionKafkaController.name);
  constructor(private readonly transactionService: TransactionService) {}
  @MessagePattern('update-transaction')
  async updateTransaction(
    @Payload()
    payload: {
      key: string;
      body: { transactionExternalId: string; isValid: boolean };
    },
  ) {
    const isValid = await validateSecretKey(payload.key);
    if (!isValid) {
      this.logger.error('Invalid secret key');
    }

    this.logger.log(
      'Transaction update payload received: ' + JSON.stringify(payload),
    );
    await this.transactionService.update(
      payload.body.transactionExternalId,
      payload.body.isValid,
    );
    this.logger.log(
      'Transaction updated successfully: ' + payload.body.transactionExternalId,
    );
  }
}
