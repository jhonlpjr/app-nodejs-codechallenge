import { ValidateTransactionRequestDTO } from "./validate-transaction.req.dto";

export interface ValidateTransactionMsgDTO {
    key: string;
    body: ValidateTransactionRequestDTO;
}