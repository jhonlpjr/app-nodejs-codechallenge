import { GetTransactionUseCase } from '../../../src/modules/transaction/application/usecases/get-transaction.usecase';
import { TransactionRepository } from '../../../src/modules/transaction/domain/repository/transaction.repository';
import { Transaction } from '../../../src/modules/transaction/domain/interfaces/transaction.interface';
import { Logger } from '@nestjs/common';



describe('GetTransactionUseCase', () => {
  let useCase: GetTransactionUseCase;
  let mockTransactionRepository: jest.Mocked<TransactionRepository>;

  const mockTransaction: Transaction = {
    id: 1,
    transaction_id: 'test-uuid',
    transfer_type_id: 1,
    status: 'pending',
    value: 100,
    account_external_id_debit: 'debit-uuid',
    account_external_id_credit: 'credit-uuid',
    created_at: new Date(),
    updated_at: new Date(),
    registered_by: 1,
  };

  beforeEach(() => {
    mockTransactionRepository = {
      findByTransactionId: jest.fn(),
    } as any;

    useCase = new GetTransactionUseCase(mockTransactionRepository);

    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should get transaction successfully', async () => {
      mockTransactionRepository.findByTransactionId.mockResolvedValue(mockTransaction);

      const result = await useCase.execute('test-uuid');

      expect(mockTransactionRepository.findByTransactionId).toHaveBeenCalledWith('test-uuid');
      expect(result).toEqual(mockTransaction);
    });

    it('should handle error when getting transaction', async () => {
      const error = new Error('Database error');
      mockTransactionRepository.findByTransactionId.mockRejectedValue(error);

      await expect(useCase.execute('test-uuid')).rejects.toThrow('Failed to update transaction: Database error');
    });
  });
});