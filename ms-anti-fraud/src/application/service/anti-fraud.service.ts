import { Transaction } from './../../domain/interfaces/transaction.interface';
import { inject } from "inversify";
import { ValidateTransactionUseCase } from "../usecases/validate-transaction.usecase";
import { TYPES } from "../../infraestructure/providers/types";
import logger from "../../utils/logger";

export class AntiFraudService {
    constructor(
        @inject(TYPES.ValidateAmountUseCase) private validateAmountUseCase: ValidateTransactionUseCase
    ) { }

    public async validateTransaction(transaction: Transaction): Promise<any> {
        try {
            const result = this.validateAmountUseCase.execute(transaction.value);
            return result;
        } catch (error) {
            logger.error("Error validating transaction:", error);
            throw new Error("Transaction validation failed");
        }

    }
}