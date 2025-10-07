export interface Transaction {
  transactionExternalId: string;
  accountExternalIdDebit: string | null;
  accountExternalIdCredit: string | null;
  value: number;
}
