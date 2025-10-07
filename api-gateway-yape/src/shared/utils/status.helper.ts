import { 
  GRAPHQL_STATUS_CODES, 
  OPERATION_STATUS_MAP,
  ERROR_STATUS_MAP 
} from '../constants/status.constants';

export class StatusHelper {
  static getStatusCodeForOperation(
    operationName: string, 
    operationType: 'query' | 'mutation' | 'subscription' = 'query'
  ): number {
    const specificCode = OPERATION_STATUS_MAP[operationName as keyof typeof OPERATION_STATUS_MAP];
    if (specificCode) {
      return specificCode;
    }

    switch (operationType) {
      case 'mutation':
        return GRAPHQL_STATUS_CODES.MUTATION_SUCCESS;
      case 'query':
        return GRAPHQL_STATUS_CODES.QUERY_SUCCESS;
      default:
        return GRAPHQL_STATUS_CODES.DEFAULT_SUCCESS;
    }
  }

  static getStatusCodeForError(errorType: string): number {
    return ERROR_STATUS_MAP[errorType as keyof typeof ERROR_STATUS_MAP] 
      || GRAPHQL_STATUS_CODES.DEFAULT_ERROR;
  }

  static getMessageForOperation(
    operationName: string, 
    operationType: 'query' | 'mutation' | 'subscription' = 'query'
  ): string {
    const specificMessages: Record<string, string> = {
      'login': 'Authentication successful',
      'logout': 'Session closed successfully',
      'createTransaction': 'Transaction created successfully',
      'getTransaction': 'Transaction retrieved successfully',
      'updateTransaction': 'Transaction updated successfully',
    };

    if (specificMessages[operationName]) {
      return specificMessages[operationName];
    }

    switch (operationType) {
      case 'mutation':
        return 'Modification operation successful';
      case 'query':
        return 'Query executed successfully';
      default:
        return 'Operation successful';
    }
  }

  static isSuccessCode(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
  }

  static isClientError(statusCode: number): boolean {
    return statusCode >= 400 && statusCode < 500;
  }

  static isServerError(statusCode: number): boolean {
    return statusCode >= 500;
  }
}