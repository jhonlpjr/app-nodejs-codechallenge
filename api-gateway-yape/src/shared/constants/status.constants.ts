import { HttpStatus } from '@nestjs/common';

/**
 * Mapeo de tipos de operación GraphQL a códigos de estado HTTP
 */
export const GRAPHQL_STATUS_CODES = {
  // Query operations
  QUERY_SUCCESS: HttpStatus.OK,
  QUERY_NOT_FOUND: HttpStatus.NOT_FOUND,
  
  // Mutation operations  
  MUTATION_SUCCESS: HttpStatus.OK,
  MUTATION_CREATED: HttpStatus.CREATED,
  MUTATION_UPDATED: HttpStatus.OK,
  MUTATION_DELETED: HttpStatus.NO_CONTENT,
  
  // Authentication operations
  LOGIN_SUCCESS: HttpStatus.OK,
  LOGOUT_SUCCESS: HttpStatus.OK,
  
  // Transaction operations
  TRANSACTION_CREATED: HttpStatus.CREATED,
  TRANSACTION_RETRIEVED: HttpStatus.OK,
  TRANSACTION_UPDATED: HttpStatus.OK,
  
  // Error responses
  BAD_REQUEST: HttpStatus.BAD_REQUEST,
  UNAUTHORIZED: HttpStatus.UNAUTHORIZED,
  FORBIDDEN: HttpStatus.FORBIDDEN,
  NOT_FOUND: HttpStatus.NOT_FOUND,
  CONFLICT: HttpStatus.CONFLICT,
  UNPROCESSABLE_ENTITY: HttpStatus.UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
  
  // Default responses
  DEFAULT_SUCCESS: HttpStatus.OK,
  DEFAULT_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
} as const;

/**
 * Mapeo de nombres de operaciones GraphQL a códigos de estado
 */
export const OPERATION_STATUS_MAP = {
  // Auth operations
  'login': GRAPHQL_STATUS_CODES.LOGIN_SUCCESS,
  'logout': GRAPHQL_STATUS_CODES.LOGOUT_SUCCESS,
  
  // Transaction operations
  'createTransaction': GRAPHQL_STATUS_CODES.TRANSACTION_CREATED,
  'getTransaction': GRAPHQL_STATUS_CODES.TRANSACTION_RETRIEVED,
  'updateTransaction': GRAPHQL_STATUS_CODES.TRANSACTION_UPDATED,
  
  // Generic operations
  'create': GRAPHQL_STATUS_CODES.MUTATION_CREATED,
  'update': GRAPHQL_STATUS_CODES.MUTATION_UPDATED,
  'delete': GRAPHQL_STATUS_CODES.MUTATION_DELETED,
  'get': GRAPHQL_STATUS_CODES.QUERY_SUCCESS,
  'list': GRAPHQL_STATUS_CODES.QUERY_SUCCESS,
} as const;

/**
 * Mapeo de tipos de error a códigos de estado HTTP
 */
export const ERROR_STATUS_MAP = {
  'ValidationException': GRAPHQL_STATUS_CODES.BAD_REQUEST,
  'BadRequestException': GRAPHQL_STATUS_CODES.BAD_REQUEST,
  'UnauthorizedException': GRAPHQL_STATUS_CODES.UNAUTHORIZED,
  'ForbiddenException': GRAPHQL_STATUS_CODES.FORBIDDEN,
  'NotFoundException': GRAPHQL_STATUS_CODES.NOT_FOUND,
  'ConflictException': GRAPHQL_STATUS_CODES.CONFLICT,
  'UnprocessableEntityException': GRAPHQL_STATUS_CODES.UNPROCESSABLE_ENTITY,
  'InternalServerErrorException': GRAPHQL_STATUS_CODES.INTERNAL_SERVER_ERROR,
} as const;