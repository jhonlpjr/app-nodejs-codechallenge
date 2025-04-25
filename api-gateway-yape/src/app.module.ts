import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSACTION_MICROSERVICE_TCP } from './shared/constants/microservices.cst';
import { ConfigModule } from '@nestjs/config';

@Global() // Marca este módulo como global
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Tiempo máximo de espera para las peticiones
      maxRedirects: 5, // Número máximo de redirecciones
    }),
  ],
  exports: [HttpModule], // Exporta el HttpModule para que esté disponible globalmente
})
export class HttpGlobalModule {}

@Global() // Marca este módulo como global
@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTION_MICROSERVICE_TCP,
        transport: Transport.TCP,
        options: {
          host: process.env.MS_TRANSACTION_TCP_HOST || 'localhost',
          port: parseInt(process.env.MS_TRANSACTION_TCP_PORT || '8005', 10),
        },
      },
    ]),
  ],
  exports: [ClientsModule], // Exporta el HttpModule para que esté disponible globalmente
})
export class GatewayModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles globalmente
    }),
    HttpGlobalModule,
    GatewayModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [AuthGuard],
})
export class AppModule {}
