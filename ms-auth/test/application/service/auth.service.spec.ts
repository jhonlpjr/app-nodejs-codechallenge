import { LoginReqDTO } from '../../../src/application/dto/request/login.req.dto';

describe('LoginReqDTO', () => {
  describe('constructor', () => {
    it('should create LoginReqDTO with valid data', () => {
      const dto = new LoginReqDTO('testuser', 'password123');

      expect(dto.username).toBe('testuser');
      expect(dto.password).toBe('password123');
    });

    it('should create LoginReqDTO with email username', () => {
      const dto = new LoginReqDTO('user@example.com', 'securepass');

      expect(dto.username).toBe('user@example.com');
      expect(dto.password).toBe('securepass');
    });

    it('should handle minimum length username', () => {
      const dto = new LoginReqDTO('user', 'password123');

      expect(dto.username).toBe('user');
      expect(dto.password).toBe('password123');
    });

    it('should handle maximum length username', () => {
      const longUsername = 'a'.repeat(20);
      const dto = new LoginReqDTO(longUsername, 'password123');

      expect(dto.username).toBe(longUsername);
      expect(dto.password).toBe('password123');
    });

    it('should handle minimum length password', () => {
      const dto = new LoginReqDTO('testuser', '123456');

      expect(dto.username).toBe('testuser');
      expect(dto.password).toBe('123456');
    });

    it('should create DTO with special characters in password', () => {
      const dto = new LoginReqDTO('testuser', 'P@ssw0rd!');

      expect(dto.username).toBe('testuser');
      expect(dto.password).toBe('P@ssw0rd!');
    });
  });
});