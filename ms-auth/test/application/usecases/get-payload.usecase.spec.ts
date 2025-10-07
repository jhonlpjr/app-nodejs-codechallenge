import { GetPayloadUseCase } from '../../../src/application/usecases/get-payload.usecase';
import { UnauthorizedError } from '../../../src/utils/error';

jest.mock('jsonwebtoken');
const mockJwt = require('jsonwebtoken');

describe('GetPayloadUseCase', () => {
  let useCase: GetPayloadUseCase;
  const originalEnv = process.env;

  beforeEach(() => {
    useCase = new GetPayloadUseCase();
    jest.resetAllMocks();
    process.env = { ...originalEnv, JWT_SECRET: 'test_secret' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('execute', () => {
    it('should return payload for valid token', async () => {
      const mockPayload = { id: '123', username: 'testuser', key: 'testkey' };
      mockJwt.verify.mockReturnValue(mockPayload);

      const result = await useCase.execute('valid_token');

      expect(mockJwt.verify).toHaveBeenCalledWith('valid_token', 'test_secret');
      expect(result).toEqual(mockPayload);
    });

    it('should throw UnauthorizedError for invalid token', async () => {
      mockJwt.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(useCase.execute('invalid_token')).rejects.toThrow('Invalid token');
      expect(mockJwt.verify).toHaveBeenCalledWith('invalid_token', 'test_secret');
    });

    it('should use default secret when JWT_SECRET is not set', async () => {
      process.env.JWT_SECRET = undefined;
      const mockPayload = { id: '123', username: 'testuser', key: 'testkey' };
      mockJwt.verify.mockReturnValue(mockPayload);

      const result = await useCase.execute('token');

      expect(mockJwt.verify).toHaveBeenCalledWith('token', 'default_secret');
      expect(result).toEqual(mockPayload);
    });

    it('should throw error when payload is null', async () => {
      mockJwt.verify.mockReturnValue(null);

      await expect(useCase.execute('token')).rejects.toThrow(UnauthorizedError);
    });

    it('should handle expired token error', async () => {
      const expiredError = new Error('jwt expired');
      expiredError.name = 'TokenExpiredError';
      mockJwt.verify.mockImplementation(() => {
        throw expiredError;
      });

      await expect(useCase.execute('expired_token')).rejects.toThrow('jwt expired');
    });

    it('should handle malformed token error', async () => {
      const malformedError = new Error('jwt malformed');
      malformedError.name = 'JsonWebTokenError';
      mockJwt.verify.mockImplementation(() => {
        throw malformedError;
      });

      await expect(useCase.execute('malformed_token')).rejects.toThrow('jwt malformed');
    });
  });
});