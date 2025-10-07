import { Catch, ArgumentsHost, Logger, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { 
  GRAPHQL_STATUS_CODES, 
  ERROR_STATUS_MAP 
} from '../constants/status.constants';

@Catch()
export class GlobalExceptionFilter implements GqlExceptionFilter, ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const contextType = host.getType<string>();
    
    if (contextType === 'graphql') {
      return this.handleGraphQLException(exception, host);
    } else {
      return this.handleHttpException(exception, host);
    }
  }

  private handleGraphQLException(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();
    const context = gqlHost.getContext();

    const fieldName = info?.fieldName || 'unknown';

    this.logger.error(
      `GraphQL Exception in ${fieldName}:`,
      exception.message,
      exception.stack,
    );

    const errorType = exception.constructor.name;
    
    const httpStatusCode = ERROR_STATUS_MAP[errorType as keyof typeof ERROR_STATUS_MAP] 
      || GRAPHQL_STATUS_CODES.DEFAULT_ERROR;
    const graphqlCodeMap: Record<string, string> = {
      'ValidationError': 'BAD_USER_INPUT',
      'BadRequestException': 'BAD_USER_INPUT',
      'UnauthorizedException': 'UNAUTHENTICATED',
      'ForbiddenException': 'FORBIDDEN',
      'NotFoundException': 'NOT_FOUND',
      'ConflictException': 'CONFLICT',
      'UnprocessableEntityException': 'BAD_USER_INPUT',
      'InternalServerErrorException': 'INTERNAL_SERVER_ERROR',
    };

    const graphqlCode = graphqlCodeMap[errorType] || 'INTERNAL_SERVER_ERROR';

    let errorMessage = exception.message || 'Internal server error';
    
    const errorMessages: Record<string, string> = {
      'UnauthorizedException': 'You are not authorized to perform this action',
      'ForbiddenException': 'Access to this resource is forbidden',
      'NotFoundException': 'The requested resource was not found',
      'ConflictException': 'Conflict with the current state of the resource',
      'ValidationError': 'The provided data is not valid',
      'BadRequestException': 'Bad request',
    };

    if (errorMessages[errorType]) {
      errorMessage = errorMessages[errorType];
    }

    // Crear y lanzar GraphQLError
    throw new GraphQLError(errorMessage, {
      nodes: info?.fieldNodes,
      source: info?.source,
      positions: info?.fieldNodes?.[0]?.loc ? [info.fieldNodes[0].loc.start] : undefined,
      path: info?.path,
      extensions: {
        code: graphqlCode,
        httpStatusCode,
        originalError: {
          name: errorType,
          message: exception.message,
        },
        timestamp: new Date().toISOString(),
        operation: info?.operation?.operation,
        field: fieldName,
      },
    });
  }

  private handleHttpException(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const errorType = exception.constructor.name;
    const status = exception.getStatus ? exception.getStatus() : 500;

    this.logger.error(
      `HTTP Exception on ${request.method} ${request.url}:`,
      exception.message,
      exception.stack,
    );

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || 'Internal server error',
      error: errorType,
    };

    response.status(status).json(errorResponse);
  }
}