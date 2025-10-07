import { injectable } from "inversify";
import logger from "../../utils/logger";
import { ValidateTransactionResponseDto } from "../dto/response/validate-transaction.res.dto";

@injectable()
export class ValidateTransactionUseCase {
    execute(value: number): ValidateTransactionResponseDto {

        if (isNaN(value)) {
            logger.error('Invalid value: Value must be a number');
            return new ValidateTransactionResponseDto(false, 'Invalid value');
        }
        else if (value <= 0) {
            logger.error('Invalid value: Value must be greater than 0');
            return new ValidateTransactionResponseDto(false, 'Invalid value');
        }
        else if (value > 1000) {
            logger.error('Invalid value: Value exceeds limit of 1000');
            return new ValidateTransactionResponseDto(false, 'Value exceeds limit');
        }
        else {
            logger.info('Valid value: Value is valid');
            return new ValidateTransactionResponseDto(true, 'Valid value');
        }

    }
}