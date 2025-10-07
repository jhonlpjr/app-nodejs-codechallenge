// Mock global paths that Jest cannot resolve
jest.mock('src/shared/utils/constants/repositories.cst', () => ({
  TRANSACTION_REPOSITORY: 'TRANSACTION_REPOSITORY',
}));

jest.mock('src/shared/modules/kafka/kafka.cst', () => ({
  KAFKA_SERVICE: 'KAFKA_SERVICE',
  VALIDATE_TRANSACTION_EVENT: 'VALIDATE_TRANSACTION_EVENT',
}));