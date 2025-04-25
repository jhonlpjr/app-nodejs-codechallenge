import {
  Controller,
  Get,
  Headers,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { TransactionService } from '../../application/services/transaction.service';
import { validateSecretKey } from 'src/shared/utils/functions/auth';

@Controller('transactions') // Para REST
export class TransactionHttpController {
  constructor(private readonly transactionService: TransactionService) {}

  // API REST para obtener una transacción
  @Get(':transactionExternalId')
  async getTransaction(
    @Param('transactionExternalId') transactionExternalId: string,
    @Headers('Secret-Key') secretKey: string, // Obtén el secretKey desde los headers
  ) {
    // Valida el secretKey
    const isValid = await validateSecretKey(secretKey);
    if (!isValid) {
      throw new UnauthorizedException('Invalid secret key');
    }
    return this.transactionService.get(transactionExternalId);
  }
}
