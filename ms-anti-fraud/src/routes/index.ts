import Router from 'koa-router';
import Koa from 'koa';
import { AntiFraudController } from '../infraestructure/controllers/anti-fraud.controller';
import logger from '../utils/logger';
import { authMiddleware } from '../middleware/auth.middleware';

const router = new Router({ prefix: '/api/v1' });

const antiFraudController = new AntiFraudController();

export function setRoutes(app: Koa) {
    router.get('/', async (ctx) => {
        ctx.body = 'API MS Anti-Fraud';
    });

    router.post('/validate-transaction', authMiddleware, async (ctx) => { await antiFraudController.validateTransaction(ctx) });
    
    router.stack.forEach((route) => {
        logger.info(`Route registered: [${route.methods.join(', ')}] ${route.path}`);
    });
    app.use(router.routes()).use(router.allowedMethods());
}
