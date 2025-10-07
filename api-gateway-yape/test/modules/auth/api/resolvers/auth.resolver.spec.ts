import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from 'src/modules/auth/api/resolvers/auth.resolver';
import { AuthService } from 'src/modules/auth/application/services/auth.service';
import { AuthMapper } from 'src/modules/auth/api/mappers/auth.mapper';
import { LoginInput } from 'src/modules/auth/api/dto/input/login.input';
import { LoginResponse } from 'src/modules/auth/api/dto/type/login-response.type';
import { GRAPHQL_STATUS_CODES } from 'src/shared/constants/status.constants';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;
  let authMapper: AuthMapper;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockAuthMapper = {
    toLoginResponse: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: AuthMapper,
          useValue: mockAuthMapper,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
    authMapper = module.get<AuthMapper>(AuthMapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const loginInput: LoginInput = {
        username: 'testuser',
        password: 'testpass123',
      };

      const mockServiceResponse = {
        token: 'mock-jwt-token',
      };

      const mockLoginResponse: LoginResponse = {
        code: GRAPHQL_STATUS_CODES.LOGIN_SUCCESS,
        message: 'Login exitoso',
        data: {
          token: 'mock-jwt-token',
        },
      };

      mockAuthService.login.mockResolvedValue(mockServiceResponse);
      mockAuthMapper.toLoginResponse.mockReturnValue(mockLoginResponse);

      const result = await resolver.login(loginInput);

      expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'testpass123');
      expect(mockAuthMapper.toLoginResponse).toHaveBeenCalledWith(mockServiceResponse);
      expect(result).toEqual(mockLoginResponse);
      expect(result.data.token).toBe('mock-jwt-token');
    });

    it('should handle login failure with invalid credentials', async () => {
      const loginInput: LoginInput = {
        username: 'testuser',  
        password: 'wrongpass',
      };

      mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'));

      await expect(resolver.login(loginInput)).rejects.toThrow('Invalid credentials');
      expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'wrongpass');
    });

    it('should handle service errors', async () => {
      const loginInput: LoginInput = {
        username: 'testuser',
        password: 'testpass123',
      };

      mockAuthService.login.mockRejectedValue(new Error('Service unavailable'));

      await expect(resolver.login(loginInput)).rejects.toThrow('Service unavailable');
      expect(mockAuthService.login).toHaveBeenCalledWith('testuser', 'testpass123');
    });
  });
});