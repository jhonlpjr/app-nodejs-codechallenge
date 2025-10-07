import { HttpStatus } from '@nestjs/common';
import { IResponse } from './response.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> implements IResponse {
  @ApiProperty({
    description: 'Código de estado del response',
    default: HttpStatus.OK,
  })
  statusCode: number = HttpStatus.OK;
  @ApiProperty({
    description: 'Mensaje del response',
    default: 'OK',
  })
  message: string;
  @ApiProperty({
    description: 'Data que trae el response',
    default: {},
  })
  data: T;
  constructor(partial: Partial<ResponseDto<T>>) {
    this.statusCode = partial.statusCode || HttpStatus.OK;
    this.data = partial.data || ({} as T);
    this.message = partial.message || 'OK';
  }
}
