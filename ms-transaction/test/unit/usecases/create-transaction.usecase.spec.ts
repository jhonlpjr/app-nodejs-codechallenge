import { CreateTransactionUseCase } from '../../../src/modules/transaction/application/usecases/create-transaction.usecase';
import { TransactionRepository } from '../../../src/modules/transaction/domain/repository/transaction.repository';
import { TransactionMapper } from '../../../src/modules/transaction/application/mappers/transaction.adapter';
import { CreateTransactionReqDTO } from '../../../src/modules/transaction/application/dto/request/create-transaction.request.dto';
import { Transaction } from '../../../src/modules/transaction/domain/interfaces/transaction.interface';
import { ClientKafka, RpcException } from '@nestjs/microservices';
import { UniqueConstraintError } from 'sequelize';
import { Logger } from '@nestjs/common';



jest.mock('../../../src/modules/transaction/application/mappers/transaction.adapter');

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;
  let mockTransactionRepository: jest.Mocked<TransactionRepository>;
  let mockKafkaClient: jest.Mocked<ClientKafka>;

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
    mockTransactionRepository = {
      create: jest.fn(),
    } as any;

    mockKafkaClient = {
      emit: jest.fn(),
      connect: jest.fn(),
    } as any;

    useCase = new CreateTransactionUseCase(mockTransactionRepository, mockKafkaClient);

    (TransactionMapper.fromDtoToTransaction as jest.Mock).mockReturnValue(mockTransaction);

    jest.spyOn(Logger.prototype, 'log').mockImplementation();
    jest.spyOn(Logger.prototype, 'warn').mockImplementation();
    jest.spyOn(Logger.prototype, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create transaction successfully', async () => {
      mockTransactionRepository.create.mockResolvedValue(mockTransaction);

      const result = await useCase.execute(mockCreateTransactionDTO, 1, 'test-key');

      expect(TransactionMapper.fromDtoToTransaction).toHaveBeenCalledWith(mockCreateTransactionDTO, 1);
      expect(mockTransactionRepository.create).toHaveBeenCalledWith(mockTransaction);
      expect(mockKafkaClient.emit).toHaveBeenCalled();
      expect(result).toEqual(mockTransaction);
    });

    it('should handle UniqueConstraintError', async () => {
      const uniqueError = new UniqueConstraintError({ message: 'Unique constraint error' });
      mockTransactionRepository.create.mockRejectedValue(uniqueError);

      await expect(useCase.execute(mockCreateTransactionDTO, 1, 'test-key'))
        .rejects.toThrow(RpcException);
    });

    it('should handle generic error', async () => {
      const genericError = new Error('Generic error');
      mockTransactionRepository.create.mockRejectedValue(genericError);

      await expect(useCase.execute(mockCreateTransactionDTO, 1, 'test-key'))
        .rejects.toThrow(RpcException);
    });
  });

  describe('onModuleInit', () => {
    it('should connect to Kafka successfully', async () => {
      mockKafkaClient.connect.mockResolvedValue(undefined);

      await useCase.onModuleInit();

      expect(mockKafkaClient.connect).toHaveBeenCalled();
    });

    it('should handle Kafka connection error', async () => {
      const connectionError = new Error('Connection failed');
      mockKafkaClient.connect.mockRejectedValue(connectionError);

      await useCase.onModuleInit();

      expect(mockKafkaClient.connect).toHaveBeenCalled();
    });
  });
});