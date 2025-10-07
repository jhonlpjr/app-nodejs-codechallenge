import { UpdateTransactionReqDTO } from '../../../src/modules/transaction/application/dto/request/update-transaction.request.dto';
import { validate } from 'class-validator';

describe('UpdateTransactionReqDTO', () => {
  it('should create a valid DTO with constructor', () => {
    const params = {
      transactionExternalId: '550e8400-e29b-41d4-a716-446655440000',
      isValid: true,
    };

    const dto = new UpdateTransactionReqDTO(params);

    expect(dto.transactionExternalId).toBe(params.transactionExternalId);
    expect(dto.isValid).toBe(params.isValid);
  });

  it('should handle null transactionExternalId in constructor', () => {
    const params = {
      transactionExternalId: undefined,
      isValid: false,
    };

    const dto = new UpdateTransactionReqDTO(params);

    expect(dto.transactionExternalId).toBeNull();
    expect(dto.isValid).toBe(params.isValid);
  });

  it('should validate successfully with valid UUID and boolean', async () => {
    const dto = new UpdateTransactionReqDTO({
      transactionExternalId: '550e8400-e29b-41d4-a716-446655440000',
      isValid: true,
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation with invalid UUID', async () => {
    const dto = new UpdateTransactionReqDTO({
      transactionExternalId: 'invalid-uuid',
      isValid: true,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('transactionExternalId');
  });

  it('should fail validation with non-boolean isValid', async () => {
    const dto = new UpdateTransactionReqDTO({
      transactionExternalId: '550e8400-e29b-41d4-a716-446655440000',
      isValid: 'invalid' as any,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('isValid');
  });
});