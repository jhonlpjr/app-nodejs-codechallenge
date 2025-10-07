import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  TRANSACTION_CLIENT_ID,
  TRANSACTION_CONSUMER_GROUP_ID,
} from './shared/modules/kafka/kafka.cst';
import { ENVIRONMENT } from './shared/utils/enums/environment.enum';
import { TcpModule } from './tcp.module';

async function bootstrap() {
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    TcpModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.TCP_HOST || 'localhost',
        port: Number(process.env.TCP_PORT) || 8005,
      },
    },
  );

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: TRANSACTION_CLIENT_ID,
          brokers: [process.env.KAFKA_BROKER],
        },
        consumer: {
          groupId: TRANSACTION_CONSUMER_GROUP_ID,
        },
      },
    },
  );

  console.log(
    'Starting HTTP application...',
    process.env[ENVIRONMENT.VARIABLE.PORT],
  );
  const httpPort = process.env[ENVIRONMENT.VARIABLE.PORT] || 3000;
  const httpApp = await NestFactory.create(AppModule);
  const apiPrefix = process.env.API_PREFIX || 'api';
  console.log(
    '>>>>> ApiPRefix...',
    process.env[ENVIRONMENT.VARIABLE.API_PREFIX],
  );
  httpApp.setGlobalPrefix(`${apiPrefix}/v1`);
  await httpApp.listen(httpPort);

  await tcpApp.listen();
  await kafkaApp.listen();
}
bootstrap();
