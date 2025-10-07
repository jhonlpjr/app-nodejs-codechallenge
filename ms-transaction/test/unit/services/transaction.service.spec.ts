import { TransactionService } from '../../../src/modules/transaction/application/services/transaction.service';
import { CreateTransactionUseCase } from '../../../src/modules/transaction/application/usecases/create-transaction.usecase';
import { UpdateTransactionUseCase } from '../../../src/modules/transaction/application/usecases/update-transaction.usecase';
import { GetTransactionUseCase } from '../../../src/modules/transaction/application/usecases/get-transaction.usecase';
import { CreateTransactionReqDTO } from '../../../src/modules/transaction/application/dto/request/create-transaction.request.dto';
import { Transaction } from '../../../src/modules/transaction/domain/interfaces/transaction.interface';
import { RpcException } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockCreateTransactionUseCase: jest.Mocked<CreateTransactionUseCase>;
  let mockUpdateTransactionUseCase: jest.Mocked<UpdateTransactionUseCase>;
  let mockGetTransactionUseCase: jest.Mocked<GetTransactionUseCase>;

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

  const mockCreateTransactionDTO: CreateTransactionReqDTO = {
    accountExternalIdDebit: 'debit-uuid',
    accountExternalIdCredit: 'credit-uuid',
    tranferTypeId: 1,
    value: 100,
  };

  beforeEach(() => {
    mockCreateTransactionUseCase = {
      execute: jest.fn(),
    } as any;

    mockUpdateTransactionUseCase = {
      execute: jest.fn(),
    } as any;

    mockGetTransactionUseCase = {
      execute: jest.fn(),
    } as any;

    service = new TransactionService(
      mockCreateTransactionUseCase,
      mockUpdateTransactionUseCase,
      mockGetTransactionUseCase,
    );

    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create transaction successfully', async () => {
      mockCreateTransactionUseCase.execute.mockResolvedValue(mockTransaction);

      const result = await service.create(mockCreateTransactionDTO, 1, 'test-key');

      expect(mockCreateTransactionUseCase.execute).toHaveBeenCalledWith(mockCreateTransactionDTO, 1, 'test-key');
      expect(result).toEqual(mockTransaction);
    });

    it('should handle error when creating transaction', async () => {
      const error = new Error('Create error');
      mockCreateTransactionUseCase.execute.mockRejectedValue(error);

      await expect(service.create(mockCreateTransactionDTO, 1, 'test-key'))
        .rejects.toThrow(RpcException);
    });
  });

  describe('update', () => {
    it('should update transaction successfully', async () => {
      const updatedTransaction = { ...mockTransaction, status: 'approved' };
      mockUpdateTransactionUseCase.execute.mockResolvedValue(updatedTransaction);

      const result = await service.update('test-uuid', true);

      expect(mockUpdateTransactionUseCase.execute).toHaveBeenCalledWith({
        transactionExternalId: 'test-uuid',
        isValid: true,
      });
      expect(result).toEqual(updatedTransaction);
    });

    it('should handle error when updating transaction', async () => {
      const error = new Error('Update error');
      mockUpdateTransactionUseCase.execute.mockRejectedValue(error);

      await expect(service.update('test-uuid', true))
        .rejects.toThrow('Error in the transaction service: Update error');
    });
  });

  describe('get', () => {
    it('should get transaction successfully', async () => {
      mockGetTransactionUseCase.execute.mockResolvedValue(mockTransaction);

      const result = await service.get('test-uuid');

      expect(mockGetTransactionUseCase.execute).toHaveBeenCalledWith('test-uuid');
      expect(result).toEqual(mockTransaction);
    });

    it('should handle error when getting transaction', async () => {
      const error = new Error('Get error');
      mockGetTransactionUseCase.execute.mockRejectedValue(error);

      await expect(service.get('test-uuid'))
        .rejects.toThrow('Error in the transaction service: Get error');
    });
  });
});