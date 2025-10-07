import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DBENUM } from './shared/utils/enums/database.enum';
import { configurationDB } from './shared/config/configuration-db';
import { TransactionModule } from './modules/transaction/transaction.module';

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
    TransactionModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
