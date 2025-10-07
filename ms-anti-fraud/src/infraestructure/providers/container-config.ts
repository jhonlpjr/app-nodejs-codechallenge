import { Container } from 'inversify';
import { TYPES } from './types';
import { ValidateTransactionUseCase } from '../../application/usecases/validate-transaction.usecase';
import { AntiFraudService } from '../../application/service/anti-fraud.service';

const container = new Container();

container.bind<ValidateTransactionUseCase>(TYPES.ValidateAmountUseCase).to(ValidateTransactionUseCase);
container.bind<AntiFraudService>(TYPES.AntiFraudService).to(AntiFraudService);

export { container };