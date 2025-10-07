import { TransactionMapper } from 'src/modules/transaction/api/mappers/transaction.mapper';
import { CreateTransactionInput } from 'src/modules/transaction/api/dto/input/create-transaction.input';
import { CreateTransactionReqDTO } from 'src/modules/transaction/application/dto/request/create-transaction.request.dto';
import { TransactionResDTO } from 'src/modules/transaction/application/dto/response/transaction.response.dto';
import { CreateTransactionResponse, GetTransactionResponse } from 'src/modules/transaction/api/dto/type/transaction-response.type';
import { GRAPHQL_STATUS_CODES } from 'src/shared/constants/status.constants';

describe('TransactionMapper', () => {
  let mapper: TransactionMapper;

  beforeEach(() => {
    mapper = new TransactionMapper();
  });

  describe('toCreateTransactionReqDTO', () => {
    it('should map CreateTransactionInput to CreateTransactionReqDTO correctly', () => {
      const input: CreateTransactionInput = {
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        transferTypeId: 1,
        amount: 150.75,
      };

      const result: CreateTransactionReqDTO = mapper.toCreateTransactionReqDTO(input);

      expect(result).toEqual({
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        tranferTypeId: 1,
        value: 150.75,
      });
    });

    it('should handle optional debit account', () => {
      const input: CreateTransactionInput = {
        accountExternalIdDebit: undefined,
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        transferTypeId: 1,
        amount: 100.00,
      };

      const result: CreateTransactionReqDTO = mapper.toCreateTransactionReqDTO(input);

      expect(result).toEqual({
        accountExternalIdDebit: undefined,
        accountExternalIdCredit: '987fcdeb-51a2-43d1-9f4e-123456789abc',
        tranferTypeId: 1,
        value: 100.00,
      });
    });

    it('should handle optional credit account', () => {
      const input: CreateTransactionInput = {
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: undefined,
        transferTypeId: 2,
        amount: 50.25,
      };

      const result: CreateTransactionReqDTO = mapper.toCreateTransactionReqDTO(input);

      expect(result).toEqual({
        accountExternalIdDebit: '123e4567-e89b-12d3-a456-426614174000',
        accountExternalIdCredit: undefined,
        tranferTypeId: 2,
        value: 50.25,
      });
    });
  });

  describe('toCreateTransactionResponse', () => {
    it('should map TransactionResDTO to CreateTransactionResponse correctly', () => {
      const transactionData: TransactionResDTO = {
        transactionExternalId: 'txn-12345',
        transactionType: { name: 'deposit' },
        transactionStatus: { name: 'PENDING' },
        value: 200.50,
        createdAt: new Date('2025-10-07T10:30:00.000Z'),
      };

      const result: CreateTransactionResponse = mapper.toCreateTransactionResponse(transactionData);

      expect(result).toEqual({
        code: GRAPHQL_STATUS_CODES.TRANSACTION_CREATED,
        message: 'Transaction was generated successfully',
        data: {
          transactionExternalId: 'txn-12345',
          transactionType: { name: 'deposit' },
          transactionStatus: { name: 'PENDING' },
          value: 200.50,
          createdAt: new Date('2025-10-07T10:30:00.000Z'),
        },
      });
    });
  });

  describe('toGetTransactionResponse', () => {
    it('should map TransactionResDTO to GetTransactionResponse correctly', () => {
      const transactionData: TransactionResDTO = {
        transactionExternalId: 'txn-67890',
        transactionType: { name: 'withdraw' },
        transactionStatus: { name: 'APPROVED' },
        value: 75.25,
        createdAt: new Date('2025-10-07T11:15:00.000Z'),
      };

      const result: GetTransactionResponse = mapper.toGetTransactionResponse(transactionData);

      expect(result).toEqual({
        code: GRAPHQL_STATUS_CODES.TRANSACTION_RETRIEVED,
        message: 'Transaction successfully obtained',
        data: {
          transactionExternalId: 'txn-67890',
          transactionType: { name: 'withdraw' },
          transactionStatus: { name: 'APPROVED' },
          value: 75.25,
          createdAt: new Date('2025-10-07T11:15:00.000Z'),
        },
      });
    });

    it('should handle null createdAt date', () => {
      const transactionData: TransactionResDTO = {
        transactionExternalId: 'txn-null-date',
        transactionType: { name: 'deposit' },
        transactionStatus: { name: 'REJECTED' },
        value: 25.00,
        createdAt: null,
      };

      const result: GetTransactionResponse = mapper.toGetTransactionResponse(transactionData);

      expect(result.data.createdAt).toBeNull();
      expect(result.data.transactionExternalId).toBe('txn-null-date');
      expect(result.data.transactionStatus.name).toBe('REJECTED');
    });
  });
});