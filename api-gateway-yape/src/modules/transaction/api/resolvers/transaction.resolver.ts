import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TransactionService } from '../../application/services/transaction.service';
import { TransactionMapper } from '../mappers/transaction.mapper';
import { CreateTransactionInput } from '../dto/input/create-transaction.input';
import { CreateTransactionResponse, GetTransactionResponse } from '../dto/type/transaction-response.type';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserLogged } from 'src/shared/decorators/user-logged.decorator';
import { UserLoggedData } from 'src/modules/auth/domain/interfaces/user.interface';

@Resolver()
export class TransactionResolver {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionMapper: TransactionMapper,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CreateTransactionResponse, {
    name: 'createTransaction',
    description: 'Create a new transaction'
  })
  async createTransaction(
    @Args('input') createTransactionInput: CreateTransactionInput,
    @UserLogged() user: UserLoggedData,
  ): Promise<CreateTransactionResponse> {
    const createTransactionDto = this.transactionMapper.toCreateTransactionReqDTO(createTransactionInput);

    const transaction = await this.transactionService.create(
      createTransactionDto,
      user.id,
      user.key,
    );

    return this.transactionMapper.toCreateTransactionResponse(transaction);
  }

  @UseGuards(AuthGuard)
  @Query(() => GetTransactionResponse, {
    name: 'getTransaction',
    description: 'Get transaction by ID'
  })
  async getTransaction(
    @Args('transactionId', { type: () => String }) transactionId: string,
    @UserLogged() user: UserLoggedData,
  ): Promise<GetTransactionResponse> {
    const transaction = await this.transactionService.getTransaction(
      transactionId,
      user.key,
    );

    return this.transactionMapper.toGetTransactionResponse(transaction);
  }
}