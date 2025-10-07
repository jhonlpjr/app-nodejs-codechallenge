import { CreateTransactionReqDTO } from '../../../src/modules/transaction/application/dto/request/create-transaction.request.dto';
import { validate } from 'class-validator';

describe('CreateTransactionReqDTO', () => {
  it('should create a valid DTO with all fields', async () => {
    const dto = new CreateTransactionReqDTO();
    dto.accountExternalIdDebit = '550e8400-e29b-41d4-a716-446655440000';
    dto.accountExternalIdCredit = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    dto.tranferTypeId = 1;
    dto.value = 100;

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail validation with invalid UUID for debit account', async () => {
    const dto = new CreateTransactionReqDTO();
    dto.accountExternalIdDebit = 'invalid-uuid';
    dto.accountExternalIdCredit = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    dto.tranferTypeId = 1;
    dto.value = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('accountExternalIdDebit');
  });

  it('should fail validation with invalid UUID for credit account', async () => {
    const dto = new CreateTransactionReqDTO();
    dto.accountExternalIdDebit = '550e8400-e29b-41d4-a716-446655440000';
    dto.accountExternalIdCredit = 'invalid-uuid';
    dto.tranferTypeId = 1;
    dto.value = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('accountExternalIdCredit');
  });

  it('should fail validation with non-number transfer type', async () => {
    const dto = new CreateTransactionReqDTO();
    dto.accountExternalIdDebit = '550e8400-e29b-41d4-a716-446655440000';
    dto.accountExternalIdCredit = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    dto.tranferTypeId = 'invalid' as any;
    dto.value = 100;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('tranferTypeId');
  });

  it('should fail validation with non-number value', async () => {
    const dto = new CreateTransactionReqDTO();
    dto.accountExternalIdDebit = '550e8400-e29b-41d4-a716-446655440000';
    dto.accountExternalIdCredit = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
    dto.tranferTypeId = 1;
    dto.value = 'invalid' as any;

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('value');
  });

  it('should validate successfully with optional fields as undefined', async () => {
    const dto = new CreateTransactionReqDTO();
    dto.tranferTypeId = 1;
    dto.value = 100;

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});