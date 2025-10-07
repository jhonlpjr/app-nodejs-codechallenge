import { VerificateSecretKeyUseCase } from '../../../src/application/usecases/verificate-secret-key.usecase';
import { AuthRepository } from '../../../src/domain/repository/auth.repository';

describe('VerificateSecretKeyUseCase', () => {
  let useCase: VerificateSecretKeyUseCase;
  let mockAuthRepository: jest.Mocked<AuthRepository>;

  beforeEach(() => {
    mockAuthRepository = {
      getUserById: jest.fn(),
      getUserByUsername: jest.fn(),
      getUserByKey: jest.fn(),
    } as jest.Mocked<AuthRepository>;

    useCase = new VerificateSecretKeyUseCase(mockAuthRepository);
    jest.resetAllMocks();
  });

  describe('execute', () => {
    it('should return status true for valid secret key', async () => {
      const mockUser = {
        user_id: 123,
        secret_key: 'valid_secret_key'
      };

      mockAuthRepository.getUserByKey.mockResolvedValue(mockUser);

      const result = await useCase.execute('valid_secret_key');

      expect(mockAuthRepository.getUserByKey).toHaveBeenCalledWith('valid_secret_key');
      expect(result).toEqual({ status: true });
    });

    it('should throw error when user not found by key', async () => {
      (mockAuthRepository.getUserByKey as jest.Mock).mockResolvedValue(null);

      await expect(useCase.execute('invalid_key')).rejects.toThrow('Secret key validation failed');
      expect(mockAuthRepository.getUserByKey).toHaveBeenCalledWith('invalid_key');
    });

    it('should handle repository errors', async () => {
      mockAuthRepository.getUserByKey.mockRejectedValue(new Error('Database connection failed'));

      await expect(useCase.execute('some_key')).rejects.toThrow('Secret key validation failed');
      expect(mockAuthRepository.getUserByKey).toHaveBeenCalledWith('some_key');
    });

    it('should validate different key formats', async () => {
      const mockUser = { user_id: 456, secret_key: 'abc123xyz' };
      mockAuthRepository.getUserByKey.mockResolvedValue(mockUser);

      const result = await useCase.execute('abc123xyz');

      expect(result.status).toBe(true);
    });

    it('should handle empty string key', async () => {
      (mockAuthRepository.getUserByKey as jest.Mock).mockResolvedValue(null);

      await expect(useCase.execute('')).rejects.toThrow('Secret key validation failed');
    });

    it('should handle undefined user response', async () => {
      (mockAuthRepository.getUserByKey as jest.Mock).mockResolvedValue(undefined);

      await expect(useCase.execute('some_key')).rejects.toThrow('Secret key validation failed');
    });
  });
});