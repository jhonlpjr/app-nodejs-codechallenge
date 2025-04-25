import { Injectable, Logger } from '@nestjs/common';
import { LoginUseCase } from '../usecases/login.usecase';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly loginUsecase: LoginUseCase) {}

  async login(username: string, password: string): Promise<any> {
    try {
      const loginResponse = await this.loginUsecase.execute(username, password);

      return loginResponse;
    } catch (error) {
      this.logger.error('Error en el servicio de autenticación', error);
      throw error;
    }
  }
}
