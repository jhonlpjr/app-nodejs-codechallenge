import { TransactionMapper } from '../../../src/modules/transaction/application/mappers/transaction.adapter';
import { CreateTransactionReqDTO } from '../../../src/modules/transaction/application/dto/request/create-transaction.request.dto';
import { TransactionEnum } from '../../../src/modules/transaction/domain/enums/transaction.enum';

describe('TransactionMapper', () => {
  describe('fromDtoToTransaction', () => {
    it('should map DTO to Transaction correctly', () => {
      const mockDate = new Date('2023-01-01T00:00:00.000Z');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      const dto: CreateTransactionReqDTO = {
        accountExternalIdDebit: 'debit-uuid',
        accountExternalIdCredit: 'credit-uuid',
        tranferTypeId: 1,
        value: 100,
      };

      const userId = 123;

      const result = TransactionMapper.fromDtoToTransaction(dto, userId);

      expect(result).toEqual({
        transfer_type_id: 1,
        status: TransactionEnum.TransactionStatus.PENDING,
        value: 100,
        account_external_id_debit: 'debit-uuid',
        account_external_id_credit: 'credit-uuid',
        created_at: mockDate,
        updated_at: mockDate,
        registered_by: 123,
      });

      jest.restoreAllMocks();
    });

    it('should handle null values for optional fields', () => {
      const mockDate = new Date('2023-01-01T00:00:00.000Z');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

      const dto: CreateTransactionReqDTO = {
        accountExternalIdDebit: undefined,
        accountExternalIdCredit: undefined,
        tranferTypeId: 2,
        value: 250,
      };

      const userId = 456;

      const result = TransactionMapper.fromDtoToTransaction(dto, userId);

      expect(result).toEqual({
        transfer_type_id: 2,
        status: TransactionEnum.TransactionStatus.PENDING,
        value: 250,
        account_external_id_debit: null,
        account_external_id_credit: null,
        created_at: mockDate,
        updated_at: mockDate,
        registered_by: 456,
      });

      jest.restoreAllMocks();
    });
  });
});