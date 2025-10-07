import { TransactionEnum } from '../../../src/modules/transaction/domain/enums/transaction.enum';

describe('TransactionEnum', () => {
  describe('TransactionStatus', () => {
    it('should have correct PENDING status', () => {
      expect(TransactionEnum.TransactionStatus.PENDING).toBe('pending');
    });

    it('should have correct APPROVED status', () => {
      expect(TransactionEnum.TransactionStatus.APPROVED).toBe('approved');
    });

    it('should have correct REJECTED status', () => {
      expect(TransactionEnum.TransactionStatus.REJECTED).toBe('rejected');
    });
  });

  describe('TransferType', () => {
    it('should have correct DEPOSIT type', () => {
      expect(TransactionEnum.TransferType.DEPOSIT).toBe('deposit');
    });

    it('should have correct WITHDRAWAL type', () => {
      expect(TransactionEnum.TransferType.WITHDRAWAL).toBe('withdrawal');
    });
  });

  describe('TransactionType', () => {
    it('should have correct TRANSFER type', () => {
      expect(TransactionEnum.TransactionType.TRANSFER).toBe('transfer');
    });

    it('should have correct PAYMENT type', () => {
      expect(TransactionEnum.TransactionType.PAYMENT).toBe('payment');
    });
  });
});