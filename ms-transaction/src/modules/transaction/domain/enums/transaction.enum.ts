export namespace TransactionEnum {
  export enum TransactionStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
  }

  export enum TransferType {
    DEPOSIT = 'deposit',
    WITHDRAWAL = 'withdrawal',
  }

  export enum TransactionType {
    TRANSFER = 'transfer',
    PAYMENT = 'payment',
  }
}
