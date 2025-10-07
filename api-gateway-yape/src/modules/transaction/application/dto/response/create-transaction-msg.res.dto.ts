export interface CreateTransactionMsgResDTO {
  status: 'failed' | 'success';
  data?: object;
  error?: string | object;
}
