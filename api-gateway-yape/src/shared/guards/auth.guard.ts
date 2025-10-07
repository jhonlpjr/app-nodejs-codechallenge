import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { configuration } from '../config/configuration-db';
import { ENVIRONMENTS } from '../enums/environments.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = request.headers['authorization']?.split(' ')[1]; // Obtén el token del header

    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      // Llama al microservicio de autenticación
      const response = await firstValueFrom(
        this.httpService.post(
          `${configuration()[ENVIRONMENTS.VARIABLES.MS_AUTH_API]}/get-payload`,
          {
            token,
          },
        ),
      );

      // Adjunta el payload decodificado a la solicitud
      request.user = response.data;
      return true;
    } catch (error) {
      this.logger.error(
        'Error en la autenticación',
        error.message || error.response?.data,
      );
      throw new UnauthorizedException(
        error.response?.data?.message || 'Token inválido',
      );
    }
  }
}