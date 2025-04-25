import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionRepository } from 'src/modules/transaction/domain/repository/transaction.repository';
import { TransactionModel } from '../models/transaction.model';
import { Logger } from '@nestjs/common';

@Injectable()
export class TransactionPostgresRepository implements TransactionRepository {
  private readonly logger = new Logger(TransactionPostgresRepository.name);
  constructor(
    @InjectModel(TransactionModel)
    private transactionModel: typeof TransactionModel,
  ) {}

  async findById(id: string): Promise<TransactionModel> {
    try {
      return await this.transactionModel.findByPk(id);
    } catch (error) {
      this.logger.error(`Error finding transaction by ID: ${error.message}`);
      throw error; // Rethrow the error or handle it as needed
    }
  }

  async findByTransactionId(transactionId: string): Promise<TransactionModel> {
    try {
      return await this.transactionModel.findOne({
        where: { transaction_id: transactionId },
      });
    } catch (error) {
      this.logger.error(
        `Error finding transaction by transaction ID: ${error.message}`,
      );
      throw error; // Rethrow the error or handle it as needed
    }
  }

  async create(
    transaction: Partial<TransactionModel>,
  ): Promise<TransactionModel> {
    try {
      return await this.transactionModel.create(transaction);
    } catch (error) {
      this.logger.error(`Error creating transaction: ${error.message}`);
      throw error; // Rethrow the error or handle it as needed
    }
  }

  async update(
    transactionId: string,
    transaction: Partial<TransactionModel>,
  ): Promise<TransactionModel> {
    try {
      await this.transactionModel.update(transaction, {
        where: { transaction_id: transactionId },
      });
      return await this.findByTransactionId(transactionId);
    } catch (error) {
      this.logger.error(`Error updating transaction: ${error.message}`);
      throw error; // Rethrow the error or handle it as needed
    }
  }
}
