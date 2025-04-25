import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ErrorResponseDto } from 'src/shared/dtos/api/response/error.res.dto';
import { CreateResponseDto } from 'src/shared/dtos/api/response/create.res.dto';
import { CreateTransactionReqDTO } from '../../application/dto/request/create-transaction.request.dto';
import { TransactionService } from '../../application/services/transaction.service';
import { UserLogged } from 'src/shared/decorators/user-logged.decorator';
import { UserLoggedData } from 'src/modules/auth/domain/interfaces/user.interface';
import { SuccessResponseDto } from 'src/shared/dtos/api/response/succes.res.dto';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly authService: TransactionService) {}

  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Create Transaction' })
  @ApiCreatedResponse({ type: CreateResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post('create')
  async login(
    @Body() params: CreateTransactionReqDTO,
    @UserLogged() user: UserLoggedData,
  ) {
    const loginRes = await this.authService.create(params, user.id, user.key);
    return new CreateResponseDto({
      message: 'Transaction was generated successfully',
      data: loginRes,
    });
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Obtain Transaction' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Get(':transactionId')
  async getTransaction(
    @Param('transactionId') transactionId: string,
    @UserLogged() user: UserLoggedData,
  ) {
    const transaction = await this.authService.getTransaction(
      transactionId,
      user.key,
    );
    return new SuccessResponseDto({
      message: 'Transaction successfully obtained',
      data: transaction,
    });
  }
}
