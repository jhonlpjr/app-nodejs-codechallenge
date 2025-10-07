import { Injectable } from '@nestjs/common';
import { LoginResDTO } from '../../application/dto/response/login.res.dto';
import { LoginResponse } from '../dto/type/login-response.type';
import { LoginType } from '../dto/type/login.type';
import { GRAPHQL_STATUS_CODES } from 'src/shared/constants/status.constants';

@Injectable()
export class AuthMapper {
  /**
   * Mapea la respuesta del servicio de login a la respuesta GraphQL
   * @param loginData - Datos de login del servicio
   * @returns LoginResponse formateada para GraphQL
   */
  toLoginResponse(loginData: LoginResDTO): LoginResponse {
    return {
      code: GRAPHQL_STATUS_CODES.LOGIN_SUCCESS,
      message: 'Login exitoso',
      data: this.toLoginType(loginData),
    };
  }

  /**
   * Mapea los datos de login a LoginType
   * @param loginData - Datos de login del servicio
   * @returns LoginType para GraphQL
   */
  private toLoginType(loginData: LoginResDTO): LoginType {
    return {
      token: loginData.token,
    };
  }
}