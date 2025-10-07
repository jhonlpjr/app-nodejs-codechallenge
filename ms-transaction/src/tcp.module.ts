import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DBENUM } from './shared/utils/enums/database.enum';
import { configurationDB } from './shared/config/configuration-db';
import { TransactionTCPModule } from './modules/transaction/transaction.module.tcp';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      ...configurationDB(DBENUM.ENGINE.POSTGRES),
      logging: true,
      pool: {
        max: 10,
        min: 5,
      },
      autoLoadModels: true,
      dialectOptions: {
        ssl: false,
      },
    }),
    TransactionTCPModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TcpModule {
  constructor(private configService: ConfigService) {
    console.log(
      'AUTH_SERVICE_URL:',
      this.configService.get<string>('AUTH_SERVICE_URL'),
    );
  }
}
