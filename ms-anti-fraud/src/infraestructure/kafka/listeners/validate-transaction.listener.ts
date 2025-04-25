
import { validate } from 'class-validator';
import { ValidateTransactionRequestDTO } from '../../../application/dto/request/validate-transaction.req.dto';
import { AntiFraudService } from '../../../application/service/anti-fraud.service';
import { container } from '../../providers/container-config';
import { Kafka } from 'kafkajs';
import { TYPES } from '../../providers/types';
import logger from '../../../utils/logger';
import { ValidateTransactionMsgDTO } from '../../../application/dto/request/validate-transaction.msg.dto';
import { validateSecretKey } from '../../../utils/auth';
import * as dotenv from 'dotenv';
dotenv.config(); // 👈 Carga las variables del .env antes de usarlas

// Kafka config
const kafka = new Kafka({
    clientId: 'anti-fraud-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9093'], // o usa process.env.KAFKA_BROKER
});

const consumer = kafka.consumer({ groupId: 'anti-fraud-group' });
const producer = kafka.producer();

export async function validateTransactionListener() {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({ topic: 'validate-transaction', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const rawPayload = message.value?.toString();
                if (!rawPayload) return;

                const { key, body } = JSON.parse(rawPayload) as ValidateTransactionMsgDTO;

                //Authorization
                const isValid = await validateSecretKey(key);

                if (!isValid) {
                    logger.error('❌ Authorization Error: Invalid secret key');
                    return;
                }

                const requestDto = new ValidateTransactionRequestDTO(body);

                const errors = await validate(requestDto);
                if (errors.length > 0) {
                    logger.error('❌ Validation Error:', errors.map(e => e.constraints));
                    return;
                }

                const antiFraudService = container.get<AntiFraudService>(TYPES.AntiFraudService);
                const result = await antiFraudService.validateTransaction(requestDto);

                // Emitir respuesta al tópico 'update-transaction'
                await producer.send({
                    topic: 'update-transaction',
                    messages: [
                        {
                            value: JSON.stringify({
                                key,
                                body: {
                                    transactionExternalId: requestDto.transactionExternalId,
                                    isValid: result.isValid,
                                }
                            }),
                        },
                    ],
                });

                logger.info('✅ Validation sended:', result);

            } catch (err) {
                logger.error('🔥 Error processing Kafka message:', err);
            }
        },
    });
}