import { AuthMapper } from 'src/modules/auth/api/mappers/auth.mapper';
import { LoginResDTO } from 'src/modules/auth/application/dto/response/login.res.dto';
import { LoginResponse } from 'src/modules/auth/api/dto/type/login-response.type';
import { GRAPHQL_STATUS_CODES } from 'src/shared/constants/status.constants';

describe('AuthMapper', () => {
  let mapper: AuthMapper;

  beforeEach(() => {
    mapper = new AuthMapper();
  });

  describe('toLoginResponse', () => {
    it('should map LoginResDTO to LoginResponse correctly', () => {
      const loginData: LoginResDTO = {
        token: 'mock-jwt-token-12345',
      };

      const result: LoginResponse = mapper.toLoginResponse(loginData);

      expect(result).toEqual({
        code: GRAPHQL_STATUS_CODES.LOGIN_SUCCESS,
        message: 'Login exitoso',
        data: {
          token: 'mock-jwt-token-12345',
        },
      });
    });

    it('should handle JWT token format', () => {
      const loginData: LoginResDTO = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };

      const result: LoginResponse = mapper.toLoginResponse(loginData);

      expect(result.data.token).toBe(loginData.token);
      expect(result.code).toBe(GRAPHQL_STATUS_CODES.LOGIN_SUCCESS);
      expect(result.message).toBe('Login exitoso');
    });

    it('should handle empty token', () => {
      const loginData: LoginResDTO = {
        token: '',
      };

      const result: LoginResponse = mapper.toLoginResponse(loginData);

      expect(result.data.token).toBe('');
      expect(result.code).toBe(GRAPHQL_STATUS_CODES.LOGIN_SUCCESS);
    });
  });
});