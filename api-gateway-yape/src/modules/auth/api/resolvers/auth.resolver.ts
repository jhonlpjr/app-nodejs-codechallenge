import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../../application/services/auth.service';
import { AuthMapper } from '../mappers/auth.mapper';
import { LoginInput } from '../dto/input/login.input';
import { LoginResponse } from '../dto/type/login-response.type';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly authMapper: AuthMapper,
  ) {}

  @Mutation(() => LoginResponse, {
    name: 'login',
    description: 'Authenticate user and obtain JWT token'
  })
  async login(@Args('input') loginInput: LoginInput): Promise<LoginResponse> {
    const loginRes = await this.authService.login(
      loginInput.username,
      loginInput.password,
    );

    // Usar el mapper para convertir la respuesta del servicio a formato GraphQL
    return this.authMapper.toLoginResponse(loginRes);
  }
}