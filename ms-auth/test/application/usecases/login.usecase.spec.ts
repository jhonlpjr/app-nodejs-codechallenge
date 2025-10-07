import { UnauthorizedError } from '../../../src/utils/error';

describe('UnauthorizedError', () => {
  describe('constructor', () => {
    it('should create UnauthorizedError with message', () => {
      const error = new UnauthorizedError('Invalid credentials');

      expect(error.message).toBe('Invalid credentials');
      expect(error.name).toBe('UnauthorizedError');
      expect(error).toBeInstanceOf(Error);
    });

    it('should create UnauthorizedError with different message', () => {
      const error = new UnauthorizedError('Access denied');

      expect(error.message).toBe('Access denied'); 
      expect(error.name).toBe('UnauthorizedError');
    });

    it('should be instance of Error', () => {
      const error = new UnauthorizedError('Test message');

      expect(error instanceof Error).toBe(true);
      expect(error instanceof UnauthorizedError).toBe(true);
    });

    it('should handle empty message', () => {
      const error = new UnauthorizedError('');

      expect(error.message).toBe('');
      expect(error.name).toBe('UnauthorizedError');
    });

    it('should handle special characters in message', () => {
      const message = 'Invalid credentials: user@example.com not found!';
      const error = new UnauthorizedError(message);

      expect(error.message).toBe(message);
      expect(error.name).toBe('UnauthorizedError');
    });

    it('should maintain stack trace', () => {
      const error = new UnauthorizedError('Test error');

      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
    });
  });
});