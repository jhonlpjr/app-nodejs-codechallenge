import { AntiFraudService } from '../../../src/application/service/anti-fraud.service';
import { ValidateTransactionUseCase } from '../../../src/application/usecases/validate-transaction.usecase';
import { ValidateTransactionResponseDto } from '../../../src/application/dto/response/validate-transaction.res.dto';
import { Transaction } from '../../../src/domain/interfaces/transaction.interface';

describe('AntiFraudService', () => {
  let service: AntiFraudService;
  let mockValidateTransactionUseCase: jest.Mocked<ValidateTransactionUseCase>;

  beforeEach(() => {
    mockValidateTransactionUseCase = {
      execute: jest.fn(),
    } as jest.Mocked<ValidateTransactionUseCase>;

    service = new AntiFraudService(mockValidateTransactionUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateTransaction', () => {
    it('should validate transaction successfully', async () => {
      const transaction: Transaction = {
        transactionExternalId: 'txn-123',
        accountExternalIdDebit: '123456789',
        accountExternalIdCredit: '987654321',
        value: 500,
      };

      const mockResponse = new ValidateTransactionResponseDto(true, 'Valid value');
      mockValidateTransactionUseCase.execute.mockReturnValue(mockResponse);

      const result = await service.validateTransaction(transaction);

      expect(mockValidateTransactionUseCase.execute).toHaveBeenCalledWith(500);
      expect(result).toEqual(mockResponse);
      expect(result.isValid).toBe(true);
    });

    it('should handle invalid transaction amount', async () => {
      const transaction: Transaction = {
        transactionExternalId: 'txn-456',
        accountExternalIdDebit: '123456789',
        accountExternalIdCredit: '987654321',
        value: 1500,
      };

      const mockResponse = new ValidateTransactionResponseDto(false, 'Value exceeds limit');
      mockValidateTransactionUseCase.execute.mockReturnValue(mockResponse);

      const result = await service.validateTransaction(transaction);

      expect(mockValidateTransactionUseCase.execute).toHaveBeenCalledWith(1500);
      expect(result).toEqual(mockResponse);
      expect(result.isValid).toBe(false);
    });

    it('should handle use case errors', async () => {
      const transaction: Transaction = {
        transactionExternalId: 'txn-789',
        accountExternalIdDebit: '123456789',
        accountExternalIdCredit: '987654321',
        value: 500,
      };

      mockValidateTransactionUseCase.execute.mockImplementation(() => {
        throw new Error('Use case error');
      });

      await expect(service.validateTransaction(transaction)).rejects.toThrow('Transaction validation failed');
      expect(mockValidateTransactionUseCase.execute).toHaveBeenCalledWith(500);
    });

    it('should validate transaction with minimum valid amount', async () => {
      const transaction: Transaction = {
        transactionExternalId: 'txn-001',
        accountExternalIdDebit: '123456789',
        accountExternalIdCredit: '987654321',
        value: 0.01,
      };

      const mockResponse = new ValidateTransactionResponseDto(true, 'Valid value');
      mockValidateTransactionUseCase.execute.mockReturnValue(mockResponse);

      const result = await service.validateTransaction(transaction);

      expect(mockValidateTransactionUseCase.execute).toHaveBeenCalledWith(0.01);
      expect(result.isValid).toBe(true);
    });

    it('should validate transaction with maximum valid amount', async () => {
      const transaction: Transaction = {
        transactionExternalId: 'txn-1000',
        accountExternalIdDebit: '123456789',
        accountExternalIdCredit: '987654321',
        value: 1000,
      };

      const mockResponse = new ValidateTransactionResponseDto(true, 'Valid value');
      mockValidateTransactionUseCase.execute.mockReturnValue(mockResponse);

      const result = await service.validateTransaction(transaction);

      expect(mockValidateTransactionUseCase.execute).toHaveBeenCalledWith(1000);
      expect(result.isValid).toBe(true);
    });
  });
});