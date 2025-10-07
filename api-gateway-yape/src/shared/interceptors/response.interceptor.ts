import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  GRAPHQL_STATUS_CODES, 
  OPERATION_STATUS_MAP 
} from '../constants/status.constants';
import { StatusHelper } from '../utils/status.helper';

export interface GraphQLResponse<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, GraphQLResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<GraphQLResponse<T>> {
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    
    return next.handle().pipe(
      map((data) => {
        if (data && (data.code !== undefined || data.statusCode !== undefined) && data.message && data.data !== undefined) {
          if (data.statusCode && !data.code) {
            data.code = data.statusCode;
            delete data.statusCode;
          }
          return data;
        }
        
        const operationName = info.fieldName;
        const operationType = info.operation.operation;
        
        const code = StatusHelper.getStatusCodeForOperation(operationName, operationType);
        const message = StatusHelper.getMessageForOperation(operationName, operationType);
        
        return {
          code,
          message,
          data,
        };
      }),
    );
  }
}