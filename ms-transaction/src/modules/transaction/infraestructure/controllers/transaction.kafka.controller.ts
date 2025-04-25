import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from '../../application/services/transaction.service';
import { Controller, Logger } from '@nestjs/common';
import { validateSecretKey } from 'src/shared/utils/functions/auth';

@Controller('transactions-kafka')
export class TransactionKafkaController {
  private readonly logger = new Logger(TransactionKafkaController.name);
  constructor(private readonly transactionService: TransactionService) {}
  // Kafka para actualizar una transacción
  @MessagePattern('update-transaction') // Para transporte Kafka
  async updateTransaction(
    @Payload()
    payload: {
      key: string;
      body: { transactionExternalId: string; isValid: boolean };
    },
  ) {
    // Aquí puedes validar el secretKey si es necesario
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
