import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GraphQLError } from 'graphql';
import { 
  GRAPHQL_STATUS_CODES, 
  ERROR_STATUS_MAP 
} from '../constants/status.constants';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    
    return next.handle().pipe(
      catchError((error) => {
        this.logger.error(
          `GraphQL Error in ${info.fieldName}:`,
          error.message,
          error.stack,
        );

        const errorType = error.constructor.name;
        const httpStatusCode = ERROR_STATUS_MAP[errorType as keyof typeof ERROR_STATUS_MAP] 
          || GRAPHQL_STATUS_CODES.DEFAULT_ERROR;

        const graphqlCodeMap: Record<string, string> = {
          'UnauthorizedException': 'UNAUTHENTICATED',
          'ForbiddenException': 'FORBIDDEN',
          'BadRequestException': 'BAD_USER_INPUT',
          'NotFoundException': 'NOT_FOUND',
          'ConflictException': 'CONFLICT',
          'ValidationException': 'BAD_USER_INPUT',
          'UnprocessableEntityException': 'BAD_USER_INPUT',
        };

        const graphqlCode = graphqlCodeMap[errorType] || 'INTERNAL_SERVER_ERROR';

        let errorMessage = error.message || 'Internal server error';
        
        if (errorType === 'UnauthorizedException') {
          errorMessage = 'Unauthorized';
        } else if (errorType === 'ForbiddenException') {
          errorMessage = 'Access forbidden';
        } else if (errorType === 'NotFoundException') {
          errorMessage = 'Resource not found';
        }

        throw new GraphQLError(errorMessage, {
          extensions: {
            code: graphqlCode,
            httpStatusCode,
            originalError: errorType,
          },
        });
      }),
    );
  }
}