import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { TransactionEnum } from 'src/modules/transaction/domain/enums/transaction.enum';

import { Transaction } from 'src/modules/transaction/domain/interfaces/transaction.interface';

@Table({ tableName: 'transaction' })
export class TransactionModel extends Model implements Transaction {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  transaction_id: string;
  @Column
  transfer_type_id: number;
  @Column
  value: number;
  @Column
  account_external_id_debit: string;
  @Column
  account_external_id_credit: string;
  @Column
  registered_by: number;

  @Column
  @CreatedAt
  created_at: Date;
  @Column
  @UpdatedAt
  updated_at: Date;

  @Column({
    type: DataType.ENUM(...Object.values(TransactionEnum.TransactionStatus)),
    defaultValue: TransactionEnum.TransactionStatus.PENDING,
  })
  status: string;
}
