import { Context, Next } from 'koa';
import { validateSecretKey } from '../utils/auth';
import { httpStatus } from '../utils/http';


export const authMiddleware = async (ctx: Context, next: Next) => {
  const secretKey = ctx.headers['Secret-Key'] as string || ctx.headers['secret-key'] as string;

  if (!secretKey) {
    ctx.status = httpStatus.UNAUTHORIZED;
    ctx.body = { error: 'Missing secret_key in headers' };
    return;
  }

  const isValid = await validateSecretKey(secretKey);

  if (!isValid) {
    ctx.status = httpStatus.FORBIDDEN;
    ctx.body = { error: 'Invalid secret_key' };
    return;
  }

  await next();
};