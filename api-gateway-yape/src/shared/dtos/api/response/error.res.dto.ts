import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { isString } from 'class-validator';

export class ErrorResponseDto extends Error {
  @ApiProperty({
    description: 'Código de estado del Response',
    default: HttpStatus.BAD_REQUEST,
  })
  statusCode: HttpStatus = HttpStatus.BAD_REQUEST;
  @ApiProperty({
    description: 'Mensaje de error',
    default: 'Error',
  })
  message: string;
  @ApiProperty({
    description: 'Descripción del error',
    default: 'Error Description',
  })
  error: string;
  @ApiProperty({
    description: 'Data que describe el error',
    default: {},
  })
  data: any;
  @ApiProperty({
    description:
      'Response interno de un posible HttpException. Describe el error',
    default: {},
  })
  response: any;
  @ApiProperty({
    description: 'Data que tiene la traza desde donde se originó el error',
    default: 'origin.origin1',
  })
  trace: string;
  @ApiProperty({
    description: 'Fecha y hora del error',
    default: '2024-02-24T21:03:39.964Z',
  })
  timestamp: Date;
  @ApiProperty({
    description: 'Data que tiene la traza desde donde se originó el error',
    default: '/api/v1/module/id',
  })
  path: string;

  original?: any;

  origin?: string;

  status?: HttpStatus;

  constructor(partial: Partial<ErrorResponseDto>) {
    super();
    this.statusCode =
      partial.statusCode || partial.status || HttpStatus.BAD_REQUEST;

    //Error de validación de parámetros
    if (Array.isArray(partial.message)) {
      this.message = 'Error de validación de parámetros';
      this.error = partial.message.join(', ');
      this.data = { detail: partial.message };
    }
    //Errores de la base de datos
    else {
      this.message = partial.message || partial.error;
      this.error =
        partial.error ||
        partial.original?.detail ||
        partial.original?.message ||
        partial.data?.message ||
        partial.response?.error ||
        partial.message;
      this.data = partial.data || {};

      if (partial.response) this.response = partial.response;

      if (isString(partial.origin)) {
        if (isString(partial.trace)) {
          this.trace = `${partial.origin}.${partial.trace}`;
        } else {
          this.trace = partial.origin;
        }
      }

      if (this.error.includes('already exists')) {
        this.data = { detail: this.error };
      }
      if (this.data?.detail?.includes('already exists')) {
        const detailError = this.data.detail;
        const regex = /\((.*?)\)=\((.*?)\)/;
        const match = detailError.match(regex);

        this.data.key = match[1];
        this.data.value = match[2];
        this.error = 'El registro ya existe';
      }
    }
  }
}
