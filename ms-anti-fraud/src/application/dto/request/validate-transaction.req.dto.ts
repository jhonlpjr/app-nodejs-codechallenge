import { IsDefined, IsNumber, IsOptional, IsUUID, Min } from "class-validator";
import { Transaction } from "../../../domain/interfaces/transaction.interface";

export class ValidateTransactionRequestDTO implements Transaction {
    @IsUUID()
    transactionExternalId: string;
    @IsUUID()
    @IsOptional()
    accountExternalIdDebit: string | null;
    @IsUUID()
    @IsOptional()
    accountExternalIdCredit: string | null;
    @IsNumber()
    @Min(0)
    value: number;

    constructor(transaction: Transaction) {
        this.transactionExternalId = transaction.transactionExternalId;
        this.accountExternalIdDebit = transaction.accountExternalIdDebit || null;
        this.accountExternalIdCredit = transaction.accountExternalIdCredit || null;
        this.value = transaction.value;
    }
}