import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LoginResDTO } from '../dto/response/login.res.dto';
import { configuration } from 'src/shared/config/configuration-db';
import { ENVIRONMENTS } from 'src/shared/enums/environments.enum';

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger(LoginUseCase.name);
  constructor(private readonly httpService: HttpService) {}

  async execute(username: string, password: string): Promise<LoginResDTO> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${configuration()[ENVIRONMENTS.VARIABLES.MS_AUTH_API]}/login`,
          {
            username,
            password,
          },
        ),
      );
      return response.data as LoginResDTO;
    } catch (error) {
      // Manejo del error
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        this.logger.error(
          `Error en la autenticación: ${error.response.status} - ${error.response.data.message || error.response.data.error}`,
        );
        throw new UnauthorizedException(
          error.response.data.message || 'Credenciales inválidas',
        );
      } else if (error.request) {
        // No se recibió respuesta del servidor
        this.logger.error(
          'No se recibió respuesta del servidor',
          error.request,
        );
        throw new UnauthorizedException('Error de conexión con el servidor');
      } else {
        // Error al configurar la solicitud
        this.logger.error('Error al realizar la solicitud', error.message);
        throw new UnauthorizedException('Error interno en la autenticación');
      }
    }
  }
}
