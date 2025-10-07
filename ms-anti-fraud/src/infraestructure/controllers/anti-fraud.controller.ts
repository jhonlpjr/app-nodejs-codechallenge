import { Context } from 'koa';
import { AntiFraudService } from '../../application/service/anti-fraud.service';
import { TYPES } from '../providers/types';
import { container } from '../providers/container-config';
import { ERROR_INTERNAL_SERVER } from '../../utils/error';
import { httpStatus } from '../../utils/http';
import { Transaction } from '../../domain/interfaces/transaction.interface';
import { ValidateTransactionRequestDTO } from '../../application/dto/request/validate-transaction.req.dto';
import { validate } from 'class-validator';


export class AntiFraudController {
    async validateTransaction(ctx: Context) {

        try {
            const antiFraudService = container.get<AntiFraudService>(TYPES.AntiFraudService);

            const requestBody: Transaction = ctx.request.body as Transaction;

            const requestDto = new ValidateTransactionRequestDTO(requestBody);

            const errors = await validate(requestDto);

            if (errors.length > 0) {
                ctx.status = httpStatus.BAD_REQUEST;
                ctx.body = { errors: errors.map(error => error.constraints) };
                return;
            }
            const result = await antiFraudService.validateTransaction(requestDto);

            if (!result.isValid) {
                ctx.status = httpStatus.UNPROCESSABLE_ENTITY;
                ctx.body = result;
                return;
              }
        
              ctx.status = httpStatus.OK;
              ctx.body = result;

            ctx.body = result;
        } catch (error) {
            ctx.status = httpStatus.INTERNAL_SERVER_ERROR;
            ctx.body = { error: ERROR_INTERNAL_SERVER };
        }
    }
}