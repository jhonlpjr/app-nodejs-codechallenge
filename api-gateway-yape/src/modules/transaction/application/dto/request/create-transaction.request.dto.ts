import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateTransactionReqDTO {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'ID de la cuenta de débito',
    default: '123e4567-e89b-12d3-a456-426614174000',
  })
  accountExternalIdDebit: string;
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'ID de la cuenta de crédito',
    default: '123e4567-e89b-12d3-a456-426614174000',
  })
  accountExternalIdCredit: string;
  @IsNumber()
  @ApiProperty({
    description: 'ID del tipo de transferencia',
    default: 1,
  })
  tranferTypeId: number;
  @IsNumber()
  @ApiProperty({
    description: 'Valor del monto de la transacción',
    default: 100.5,
  })
  value: number;
}
