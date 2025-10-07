import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { TRANSACTION_REPOSITORY } from 'src/shared/utils/constants/repositories.cst';
import { CreateTransactionReqDTO } from '../dto/request/create-transaction.request.dto';
import { Transaction } from '../../domain/interfaces/transaction.interface';
import { TransactionMapper } from '../mappers/transaction.adapter';
import {
  KAFKA_SERVICE,
  VALIDATE_TRANSACTION_EVENT,
} from 'src/shared/modules/kafka/kafka.cst';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { ValidateTransactionReqDTO } from '../dto/request/validate-transaction.request.dto';
import { UniqueConstraintError } from 'sequelize';

export class CreateTransactionUseCase implements OnModuleInit {
  private readonly logger = new Logger(CreateTransactionUseCase.name);
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
    @Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka,
  ) {}

  async execute(
    createTransactionDTO: CreateTransactionReqDTO,
    userId: number,
    key: string,
  ): Promise<Transaction> {
    try {
      const createTransactionParams = TransactionMapper.fromDtoToTransaction(
        createTransactionDTO,
        userId,
      );
      const createdTransaction = await this.transactionRepository.create(
        createTransactionParams,
      );

      const validateTransactionDTO = new ValidateTransactionReqDTO(
        createdTransaction,
      );
      this.kafkaClient.emit(VALIDATE_TRANSACTION_EVENT, {
        value: { key, body: validateTransactionDTO },
      });

      return createdTransaction;
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        this.logger.warn('🔒 Duplicate Record:', error.message);
        throw new RpcException('There is already a record with that data.');
      }

      this.logger.error(
        `Error creating transaction: ${error.message}`,
        error.stack,
      );
      throw new RpcException(`Failed to create transaction: ${error.message}`);
    }
  }

  async onModuleInit() {
    this.logger.log(`🧪 ENV KAFKA_BROKER: ${process.env.KAFKA_BROKER}`);

    try {
      await this.kafkaClient.connect();
      this.logger.log(`✅ Kafka client connected`);
    } catch (error) {
      this.logger.error(`❌ Error Kafka connection: ${error.message}`);
    }
  }
}
