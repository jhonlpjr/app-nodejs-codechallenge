import { ValidateTransactionResponseDto } from '../../../../src/application/dto/response/validate-transaction.res.dto';

describe('ValidateTransactionResponseDto', () => {
  describe('constructor', () => {
    it('should create response DTO with valid data', () => {
      const response = new ValidateTransactionResponseDto(true, 'Valid value');

      expect(response.isValid).toBe(true);
      expect(response.message).toBe('Valid value');
    });

    it('should create response DTO with invalid data', () => {
      const response = new ValidateTransactionResponseDto(false, 'Invalid value');

      expect(response.isValid).toBe(false);
      expect(response.message).toBe('Invalid value');
    });

    it('should create response DTO for exceeding limit', () => {
      const response = new ValidateTransactionResponseDto(false, 'Value exceeds limit');

      expect(response.isValid).toBe(false);
      expect(response.message).toBe('Value exceeds limit');
    });

    it('should handle boolean and string types correctly', () => {
      const response = new ValidateTransactionResponseDto(true, 'Test message');

      expect(typeof response.isValid).toBe('boolean');
      expect(typeof response.message).toBe('string');
      expect(response.isValid).toBe(true);
      expect(response.message).toBe('Test message');
    });
  });
});