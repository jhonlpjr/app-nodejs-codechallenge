import { TransactionEnum } from '../../domain/enums/transaction.enum';
import { Transaction } from '../../domain/interfaces/transaction.interface';
import { CreateTransactionReqDTO } from '../dto/request/create-transaction.request.dto';

export namespace TransactionMapper {
  export function fromDtoToTransaction(
    dto: CreateTransactionReqDTO,
    userId: number,
  ): Transaction {
    return {
      transfer_type_id: dto.tranferTypeId,
      status: TransactionEnum.TransactionStatus.PENDING,
      value: dto.value,
      account_external_id_debit: dto.accountExternalIdDebit || null,
      account_external_id_credit: dto.accountExternalIdCredit || null,
      created_at: new Date(),
      updated_at: new Date(),
      registered_by: userId,
    } as Transaction;
  }
}
