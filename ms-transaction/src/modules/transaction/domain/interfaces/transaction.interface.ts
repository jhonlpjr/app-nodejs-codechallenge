export interface Transaction {
  id: number;
  transaction_id: string;
  transfer_type_id: number;
  status: string;
  value: number;
  account_external_id_debit: string;
  account_external_id_credit: string;
  created_at: Date;
  updated_at: Date;
  registered_by: number;
}
