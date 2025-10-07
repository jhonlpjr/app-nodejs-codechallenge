import { ENVIRONMENT } from 'src/shared/utils/enums/environment.enum';
import { Module } from '@nestjs/common';
import { TransactionService } from './application/services/transaction.service';
import { TransactionProvider } from './infraestructure/providers/transaction.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionModel } from './infraestructure/database/models/transaction.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  KAFKA_SERVICE,
  TRANSACTION_CLIENT_ID,
  TRANSACTION_CONSUMER_GROUP_ID,
} from 'src/shared/modules/kafka/kafka.cst';
import { TransactionTcpController } from './infraestructure/controllers/transaction.tcp.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: TRANSACTION_CLIENT_ID,
            brokers: [process.env[ENVIRONMENT.VARIABLE.KAFKA_BROKER]],
          },
          consumer: {
            groupId: TRANSACTION_CONSUMER_GROUP_ID,
          },
        },
      },
    ]),
    SequelizeModule.forFeature([TransactionModel]),
  ],
  controllers: [TransactionTcpController],
  providers: [...TransactionProvider, TransactionService],
  exports: [...TransactionProvider, TransactionService],
})
export class TransactionTCPModule {}
