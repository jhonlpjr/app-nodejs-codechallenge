import { ENVIRONMENT } from 'src/shared/utils/enums/environment.enum';

export const KAFKA_SERVICE = 'KAFKA_SERVICE';

export const TRANSACTION_CLIENT_ID = 'transaction-client';
export const TRANSACTION_BROKER =
  process.env[ENVIRONMENT.VARIABLE.KAFKA_BROKER] || 'localhost:9092';
export const TRANSACTION_CONSUMER_GROUP_ID = 'transaction-consumer';
export const VALIDATE_TRANSACTION_EVENT = 'validate-transaction';
