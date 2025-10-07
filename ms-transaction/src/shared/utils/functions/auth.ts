import { Logger } from '@nestjs/common';
import axios, { HttpStatusCode } from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const logger = new Logger('Auth');
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
logger.log('>>>>>>>>AUTH_SERVICE_URL:', AUTH_SERVICE_URL);

export async function validateSecretKey(secretKey: string): Promise<boolean> {
  if (AUTH_SERVICE_URL === undefined) {
    logger.error('AUTH_SERVICE_URL is not defined in environment variables');
    return false;
  }
  try {
    const response = await axios.post(
      `${AUTH_SERVICE_URL}/verificate-secret-key`,
      {
        secret_key: secretKey,
      },
    );
    if (response.status === HttpStatusCode.Ok) {
      return true;
    } else {
      logger.error('Invalid secret key:', response.data);
      return false;
    }
  } catch (error) {
    logger.error('Error validating secret key:', error);
    return false;
  }
}
