import { UpdateTransactionUseCase } from '../../../src/modules/transaction/application/usecases/update-transaction.usecase';
import { TransactionRepository } from '../../../src/modules/transaction/domain/repository/transaction.repository';
import { Transaction } from '../../../src/modules/transaction/domain/interfaces/transaction.interface';
import { UpdateTransactionReqDTO } from '../../../src/modules/transaction/application/dto/request/update-transaction.request.dto';
import { TransactionEnum } from '../../../src/modules/transaction/domain/enums/transaction.enum';
import { Logger } from '@nestjs/common';



describe('UpdateTransactionUseCase', () => {
  let useCase: UpdateTransactionUseCase;
  let mockTransactionRepository: jest.Mocked<TransactionRepository>;

  const mockTransaction: Transaction = {
    id: 1,
    transaction_id: 'test-uuid',
    transfer_type_id: 1,
    status: 'approved',
    value: 100,
    account_external_id_debit: 'debit-uuid',
    account_external_id_credit: 'credit-uuid',
    created_at: new Date(),
    updated_at: new Date(),
    registered_by: 1,
  };

  beforeEach(() => {
    mockTransactionRepository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateTransactionUseCase(mockTransactionRepository);

    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should update transaction to approved when valid', async () => {
      const updateDTO: UpdateTransactionReqDTO = {
        transactionExternalId: 'test-uuid',
        isValid: true,
      };
      mockTransactionRepository.update.mockResolvedValue(mockTransaction);

      const result = await useCase.execute(updateDTO);

      expect(mockTransactionRepository.update).toHaveBeenCalledWith('test-uuid', {
        status: TransactionEnum.TransactionStatus.APPROVED,
      });
      expect(result).toEqual(mockTransaction);
    });

    it('should update transaction to rejected when invalid', async () => {
      const updateDTO: UpdateTransactionReqDTO = {
        transactionExternalId: 'test-uuid',
        isValid: false,
      };
      const rejectedTransaction = { ...mockTransaction, status: 'rejected' };
      mockTransactionRepository.update.mockResolvedValue(rejectedTransaction);

      const result = await useCase.execute(updateDTO);

      expect(mockTransactionRepository.update).toHaveBeenCalledWith('test-uuid', {
        status: TransactionEnum.TransactionStatus.REJECTED,
      });
      expect(result).toEqual(rejectedTransaction);
    });

    it('should handle error when updating transaction', async () => {
      const updateDTO: UpdateTransactionReqDTO = {
        transactionExternalId: 'test-uuid',
        isValid: true,
      };
      const error = new Error('Database error');
      mockTransactionRepository.update.mockRejectedValue(error);

      await expect(useCase.execute(updateDTO)).rejects.toThrow('Failed to update transaction: Database error');
    });
  });
});