import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from './response.res.dto';

export class CreateResponseDto<T> extends ResponseDto<T> {
  @ApiProperty({
    description: 'Código de estado del response de creación',
    default: HttpStatus.CREATED,
  })
  statusCode: HttpStatus = HttpStatus.CREATED;
  @ApiProperty({
    description: 'Mensaje del response',
    default: 'Created',
  })
  message: string;
  @ApiProperty({
    description: 'Data del elemento o elementos creados',
    default: {},
  })
  data: T;
  constructor(partial: Partial<CreateResponseDto<T>>) {
    super(partial);
    this.statusCode = partial.statusCode || HttpStatus.OK;
  }
}
