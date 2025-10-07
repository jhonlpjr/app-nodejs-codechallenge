import { Test, TestingModule } from '@nestjs/testing';
import { TransactionResolver } from 'src/modules/transaction/api/resolvers/transaction.resolver';
import { TransactionService } from 'src/modules/transaction/application/services/transaction.service';
import { TransactionMapper } from 'src/modules/transaction/api/mappers/transaction.mapper';
import { CreateTransactionInput } from 'src/modules/transaction/api/dto/input/create-transaction.input';
import { CreateTransactionResponse, GetTransactionResponse } from 'src/modules/transaction/api/dto/type/transaction-response.type';
import { UserLoggedData } from 'src/modules/auth/domain/interfaces/user.interface';
import { GRAPHQL_STATUS_CODES } from 'src/shared/constants/status.constants';
import { Reflector } from '@nestjs/core';

describe('TransactionResolver', () => {
  let resolver: TransactionResolver;
  let transactionService: TransactionService;
  let transactionMapper: TransactionMapper;

  const mockTransactionService = {
    create: jest.fn(),
    getTransaction: jest.fn(),
  };

  const mockTransactionMapper = {
    toCreateTransactionReqDTO: jest.fn(),
    toCreateTransactionResponse: jest.fn(),
    toGetTransactionResponse: jest.fn(),
  };

  const mockUser: UserLoggedData = {
    id: 1,
    username: 'testuser',
    key: 'test-secret-key',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionResolver,
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
        {
          provide: TransactionMapper,
          useValue: mockTransactionMapper,
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    })
    .overrideGuard(require('src/shared/guards/auth.guard').AuthGuard)
    .useValue({
      canActivate: jest.fn(() => true),
    })
    .compile();

    resolver = module.get<TransactionResolver>(TransactionResolver);
    transactionService = module.get<TransactionService>(TransactionService);
    transactionMapper = module.get<TransactionMapper>(TransactionMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createTransaction', () => {
    it('should create a transaction successfully', async () => {
      const createTransactionInput: CreateTransactionInput = {
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        transferTypeId: 1,
        amount: 100.50,
      };

      const mockCreateTransactionReqDTO = {
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        tranferTypeId: 1,
        value: 100.50,
      };

      const mockServiceResponse = {
        transactionExternalId: 'txn-123',
        transactionType: { name: 'deposit' },
        transactionStatus: { name: 'PENDING' },
        value: 100.50,
        createdAt: new Date('2025-10-07T10:30:00.000Z'),
      };

      const mockCreateTransactionResponse: CreateTransactionResponse = {
        code: GRAPHQL_STATUS_CODES.TRANSACTION_CREATED,
        message: 'Transaction was generated successfully',
        data: {
          transactionExternalId: 'txn-123',
          transactionType: { name: 'deposit' },
          transactionStatus: { name: 'PENDING' },
          value: 100.50,
          createdAt: new Date('2025-10-07T10:30:00.000Z'),
        },
      };

      mockTransactionMapper.toCreateTransactionReqDTO.mockReturnValue(mockCreateTransactionReqDTO);
      mockTransactionService.create.mockResolvedValue(mockServiceResponse);
      mockTransactionMapper.toCreateTransactionResponse.mockReturnValue(mockCreateTransactionResponse);

      const result = await resolver.createTransaction(createTransactionInput, mockUser);

      expect(mockTransactionMapper.toCreateTransactionReqDTO).toHaveBeenCalledWith(createTransactionInput);
      expect(mockTransactionService.create).toHaveBeenCalledWith(mockCreateTransactionReqDTO, mockUser.id, mockUser.key);
      expect(mockTransactionMapper.toCreateTransactionResponse).toHaveBeenCalledWith(mockServiceResponse);
      expect(result).toEqual(mockCreateTransactionResponse);
    });

    it('should handle transaction creation failure', async () => {
      const createTransactionInput: CreateTransactionInput = {
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        transferTypeId: 1,
        amount: 100.50,
      };

      const mockCreateTransactionReqDTO = {
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        tranferTypeId: 1,
        value: 100.50,
      };

      mockTransactionMapper.toCreateTransactionReqDTO.mockReturnValue(mockCreateTransactionReqDTO);
      mockTransactionService.create.mockRejectedValue(new Error('Service unavailable'));

      await expect(resolver.createTransaction(createTransactionInput, mockUser)).rejects.toThrow('Service unavailable');
    });
  });

  describe('getTransaction', () => {
    it('should get a transaction successfully', async () => {
      const transactionId = 'txn-123';

      const mockServiceResponse = {
        transactionExternalId: 'txn-123',
        transactionType: { name: 'deposit' },
        transactionStatus: { name: 'APPROVED' },
        value: 100.50,
        createdAt: new Date('2025-10-07T10:30:00.000Z'),
      };

      const mockGetTransactionResponse: GetTransactionResponse = {
        code: GRAPHQL_STATUS_CODES.TRANSACTION_RETRIEVED,
        message: 'Transaction successfully obtained',
        data: {
          transactionExternalId: 'txn-123',
          transactionType: { name: 'deposit' },
          transactionStatus: { name: 'APPROVED' },
          value: 100.50,
          createdAt: new Date('2025-10-07T10:30:00.000Z'),
        },
      };

      mockTransactionService.getTransaction.mockResolvedValue(mockServiceResponse);
      mockTransactionMapper.toGetTransactionResponse.mockReturnValue(mockGetTransactionResponse);

      const result = await resolver.getTransaction(transactionId, mockUser);

      expect(mockTransactionService.getTransaction).toHaveBeenCalledWith(transactionId, mockUser.key);
      expect(mockTransactionMapper.toGetTransactionResponse).toHaveBeenCalledWith(mockServiceResponse);
      expect(result).toEqual(mockGetTransactionResponse);
    });

    it('should handle transaction not found', async () => {
      const transactionId = 'non-existent-txn';

      mockTransactionService.getTransaction.mockRejectedValue(new Error('Transaction not found'));

      await expect(resolver.getTransaction(transactionId, mockUser)).rejects.toThrow('Transaction not found');
    });
  });
});