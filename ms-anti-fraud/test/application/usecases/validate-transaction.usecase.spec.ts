import { ValidateTransactionUseCase } from '../../../src/application/usecases/validate-transaction.usecase';
import { ValidateTransactionResponseDto } from '../../../src/application/dto/response/validate-transaction.res.dto';

describe('ValidateTransactionUseCase', () => {
  let useCase: ValidateTransactionUseCase;

  beforeEach(() => {
    useCase = new ValidateTransactionUseCase();
  });

  describe('execute', () => {
    it('should return valid result for valid amount', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(500);

      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid value');
    });

    it('should return invalid result for amount greater than 1000', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(1500);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Value exceeds limit');
    });

    it('should return invalid result for zero amount', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(0);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid value');
    });

    it('should return invalid result for negative amount', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(-100);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid value');
    });

    it('should return invalid result for NaN value', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(NaN);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Invalid value');
    });

    it('should return valid result for boundary value 1000', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(1000);

      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid value');
    });

    it('should return valid result for minimum valid amount 0.01', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(0.01);

      expect(result.isValid).toBe(true);
      expect(result.message).toBe('Valid value');
    });

    it('should return invalid result for value just above limit', () => {
      const result: ValidateTransactionResponseDto = useCase.execute(1000.01);

      expect(result.isValid).toBe(false);
      expect(result.message).toBe('Value exceeds limit');
    });
  });
});