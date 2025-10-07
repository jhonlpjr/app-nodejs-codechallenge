import { Injectable } from '@nestjs/common';
import { TransactionResDTO } from '../../application/dto/response/transaction.response.dto';
import { CreateTransactionResponse, GetTransactionResponse } from '../dto/type/transaction-response.type';
import { Transaction, TransactionType, TransactionStatus } from '../dto/type/transaction.type';
import { CreateTransactionInput } from '../dto/input/create-transaction.input';
import { CreateTransactionReqDTO } from '../../application/dto/request/create-transaction.request.dto';
import { GRAPHQL_STATUS_CODES } from 'src/shared/constants/status.constants';

@Injectable()
export class TransactionMapper {
  toCreateTransactionReqDTO(input: CreateTransactionInput): CreateTransactionReqDTO {
    return {
      accountExternalIdDebit: input.accountExternalIdDebit,
      accountExternalIdCredit: input.accountExternalIdCredit,
      tranferTypeId: input.transferTypeId,
      value: input.amount,
    };
  }

  toCreateTransactionResponse(transactionData: TransactionResDTO): CreateTransactionResponse {
    return {
      code: GRAPHQL_STATUS_CODES.TRANSACTION_CREATED,
      message: 'Transaction was generated successfully',
      data: this.toTransaction(transactionData),
    };
  }

  toGetTransactionResponse(transactionData: TransactionResDTO): GetTransactionResponse {
    return {
      code: GRAPHQL_STATUS_CODES.TRANSACTION_RETRIEVED,
      message: 'Transaction successfully obtained',
      data: this.toTransaction(transactionData),
    };
  }

  private toTransaction(transactionData: TransactionResDTO): Transaction {
    return {
      transactionExternalId: transactionData.transactionExternalId,
      transactionType: this.toTransactionType(transactionData.transactionType),
      transactionStatus: this.toTransactionStatus(transactionData.transactionStatus),
      value: transactionData.value,
      createdAt: transactionData.createdAt || null,
    };
  }

  private toTransactionType(transactionType: { name: string }): TransactionType {
    return {
      name: transactionType.name,
    };
  }

  private toTransactionStatus(transactionStatus: { name: string }): TransactionStatus {
    return {
      name: transactionStatus.name,
    };
  }
}